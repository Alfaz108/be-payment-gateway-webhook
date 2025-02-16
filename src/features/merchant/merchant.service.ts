import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";

import { UtilService } from "src/features/common/services/utils.service";
import { CreateMerchantDto } from "./dto/create-merchant.dto";
import { UpdateMerchantDto } from "./dto/update-merchant.dto";
import { RolesEnum, USER_STATUS, collectionNames } from "../constant";
import { ClientSession, Connection, Model, Types } from "mongoose";
import { Merchant } from "./schema/merchant.schema";
import { UserService } from "../user/user.service";
import { CustomValidationPipe, IAuthUser } from "../common";
import { ActivityLogService } from "../activity-log/activity-log.service";
import { MerchantSerialService } from "./merchant-serial.service";

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(collectionNames.MERCHANT)
    private readonly merchantModel: Model<Merchant>,

    private readonly userService: UserService,
    @InjectConnection() private readonly connection: Connection,

    private readonly utilService: UtilService,

    private readonly activityLogService: ActivityLogService,
    private readonly merchantSerialService: MerchantSerialService
  ) {}

  /**
   * Create a merchant service
   * This service can be used for registration a client
   * @param createMerchantDto
   * @returns
   */
  async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();

      const userData = {
        mobile: createMerchantDto.mobile,
        password: createMerchantDto.password,
        name: createMerchantDto.name,
        role: RolesEnum.MERCHANT,
        status: createMerchantDto.merchantStatus || USER_STATUS.INACTIVE,
      };

      //create new merchant
      const newMerchant = new this.merchantModel(createMerchantDto);

      //assign the merchant into user
      userData["merchant"] = newMerchant._id.toString();

      //create user
      const user = await this.userService.create(userData, session);

      newMerchant.user = user._id;

      const serial = await this.merchantSerialService.increaseSerial(session);

      newMerchant.serial = serial.serial;

      //@ save merchant
      await newMerchant.save({ session });

      // send credential message

      //commit the transaction
      await session.commitTransaction();

      //finally return the new merchant
      return newMerchant;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  //find by id
  async findById(id: Types.ObjectId): Promise<Merchant> {
    return this.merchantModel.findById(id);
  }

  //find by mobile
  async findByMobile(mobile: string): Promise<Merchant> {
    return this.merchantModel.findOne({ mobile });
  }

  //find by userId
  async findByUserId(userId: Types.ObjectId): Promise<Merchant> {
    return await this.merchantModel.findOne({ user: userId });
  }

  async updateAvatar(id: Types.ObjectId, avatar: any): Promise<Merchant> {
    return this.merchantModel.findOneAndUpdate(
      { user: id },
      {
        $set: {
          avatar: {
            url: avatar.path,
            publicId: avatar.publicID,
            id: avatar.id,
          },
        },
      }
    );
  }

  async updateMerchantByMobile(
    mobile: string,
    updateMerchantDto: UpdateMerchantDto,
    session: ClientSession
  ): Promise<Merchant> {
    return this.updateMerchant(null, mobile, null, updateMerchantDto, session);
  }

  async updateMerchantById(
    id: Types.ObjectId,
    updateMerchantDto: UpdateMerchantDto,
    session: ClientSession
  ): Promise<Merchant> {
    return this.updateMerchant(id, null, null, updateMerchantDto, session);
  }

  async updateMerchantByUserId(
    user: Types.ObjectId,
    updateMerchantDto: UpdateMerchantDto,
    session: ClientSession
  ): Promise<Merchant> {
    return this.updateMerchant(null, null, user, updateMerchantDto, session);
  }

  //update the isp
  private async updateMerchant(
    id: Types.ObjectId,
    mobile: string,
    user: Types.ObjectId,
    updateMerchantDto: UpdateMerchantDto,
    session: ClientSession
  ): Promise<Merchant> {
    //check any validation error this will throw error if error exist
    await CustomValidationPipe([updateMerchantDto], UpdateMerchantDto);

    const query = {
      ...(id && { _id: id }),
      ...(mobile && { mobile }),
      ...(user && { user }),
    };
    const merchant = await this.merchantModel.findOne(query);

    if (!merchant) throw new NotFoundException("Merchant not found");

    if (merchant.merchantStatus !== updateMerchantDto.merchantStatus) {
      //if the user active then update the status
      await this.userService.updateStatus(
        merchant.user,
        updateMerchantDto.merchantStatus,
        session
      );
    }

    //then update the isp
    return this.merchantModel.findOneAndUpdate(
      query,
      {
        $set: updateMerchantDto,
      },
      {
        new: true,
        ...(session && { session }),
      }
    );
  }
}
