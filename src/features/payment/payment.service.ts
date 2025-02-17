import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import {
  ACTIVITY_LOG_ENUM,
  collectionNames,
  PAYMENT_METHODS_ENUM,
} from "src/features/constant";
import { Connection, Model } from "mongoose";
import { IAuthUser } from "src/features/common";
import { ActivityLogService } from "src/features/activity-log/activity-log.service";
import { UtilService } from "src/features/common/services/utils.service";
import { Payment } from "./schema/payment.schema";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { BkashPaymentService } from "./bkash-payment.service";
import { CreateBkashPaymentDto } from "./dto/create-bkash-paymentdto";
import { ExecuteBkashPaymentDto } from "./dto/execute-bkash.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(collectionNames.PAYMENT)
    private readonly paymentModel: Model<Payment>,
    @InjectConnection() private readonly connection: Connection,
    private readonly activityLogService: ActivityLogService,

    private readonly bkashPaymentService: BkashPaymentService,

    private readonly utilService: UtilService
  ) {}

  async create(authUser: IAuthUser, createPaymentDto: CreatePaymentDto) {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      let payment;

      if (createPaymentDto.paymentMechod === PAYMENT_METHODS_ENUM.BKASH) {
        const createBkashPaymentDto: CreateBkashPaymentDto = {
          ...createPaymentDto.bkash,
          sender: createPaymentDto.sender,
          amount: createPaymentDto.amount,
          intent: createPaymentDto.intent || "sale",
          reciver: createPaymentDto.reciver,
        };

        payment = await this.bkashPaymentService.create(createBkashPaymentDto);
      } else {
        throw new BadRequestException("Payment method not valid");
      }

      await session.commitTransaction();
      return payment;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async execute(
    authUser: IAuthUser,
    executeBkashPaymentDto: ExecuteBkashPaymentDto
  ) {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      let payment;

      payment = await this.bkashPaymentService.execute(executeBkashPaymentDto);

      await session.commitTransaction();
      return payment;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}

// const createPayment: CreatePaymentDto = {
//   PaymentAppId: createPaymentDto.PaymentAppId,
//   paymentStatus: createPaymentDto.paymentStatus,
//   amount: createPaymentDto.amount,
//   paymentMechod: createPaymentDto.paymentMechod,
// };

// const paymentApp = new this.paymentModel({
//   ...createPayment,
//   merchant: authUser.merchant,
// });

// const paymentAppData = await paymentApp.save({ session });
