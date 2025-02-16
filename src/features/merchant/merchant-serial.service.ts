import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientSession, Model } from "mongoose";
import { collectionNames } from "src/features/constant";
import { MerchantSerial } from "./schema/merchant-serial-schema";

@Injectable()
export class MerchantSerialService {
  constructor(
    @InjectModel(collectionNames.MERCHANT_SERIAL)
    private readonly merchantSerialModel: Model<MerchantSerial>
  ) {}

  async findMerchantSerial(): Promise<MerchantSerial> {
    return this.findMerchantSerial();
  }
  async createMerchantSerial(session: ClientSession) {
    const serial = new this.merchantSerialModel({
      serial: 1000,
    });

    return await serial.save({ session });
  }

  async increaseSerial(session: ClientSession): Promise<MerchantSerial> {
    let serial = await this.merchantSerialModel.findOneAndUpdate(
      {},
      {
        $inc: {
          serial: 1,
        },
      },
      {
        new: true,
        session,
      }
    );

    if (!serial) {
      serial = await this.createMerchantSerial(session);
    }

    return serial;
  }
}
