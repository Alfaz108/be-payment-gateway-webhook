import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import * as dotenv from "dotenv";
import { InjectConnection } from "@nestjs/mongoose";
import { ClientSession, Connection } from "mongoose";
import { CreateBkashPaymentDto } from "./dto/create-bkash-paymentdto";
import { ExecuteBkashPaymentDto } from "./dto/execute-bkash.dto";

dotenv.config(); // Load environment variables

@Injectable()
export class BkashPaymentService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getBkashAccessToken(
    URL: string,
    appKey: string,
    appSecret: string,
    username: string,
    password: string
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${URL}/checkout/token/grant`,
        {
          app_key: appKey,
          app_secret: appSecret,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            username: username,
            password: password,
          },
        }
      );

      if (response.data?.id_token) {
        return response.data.id_token;
      } else {
        throw new HttpException(
          "Failed to retrieve bKash token",
          HttpStatus.UNAUTHORIZED
        );
      }
    } catch (error) {
      throw new HttpException(
        "bKash token request failed",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async create(createBkashPaymentDto: CreateBkashPaymentDto) {
    try {
      const {
        isTokenized,
        appKey,
        appSecret,
        username,
        password,
        sender,
        amount,
        intent,
        reciver,
        callbackUrl,
      } = createBkashPaymentDto;

      const baseUrl = isTokenized
        ? "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized"
        : "https://checkout.pay.bka.sh/v1.2.0-beta";

      const token = await this.getBkashAccessToken(
        baseUrl,
        appKey,
        appSecret,
        username,
        password
      );

      console.log({ token });

      const payload: any = {
        mode: "0011",
        payerReference: " ",
        amount,
        currency: "BDT",
        intent,
        merchantInvoiceNumber: reciver,
      };

      if (isTokenized) {
        payload.callbackURL = callbackUrl;
      }

      const paymentCreateURL = isTokenized
        ? "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/create"
        : "https://checkout.pay.bka.sh/v1.2.0-beta/checkout/payment/create";

      const response = await axios.post(`${paymentCreateURL}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-app-key": appKey,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async execute(executeBkashPaymentDto: ExecuteBkashPaymentDto) {
    try {
      const { isTokenized, appKey, appSecret, username, password, paymentID } =
        executeBkashPaymentDto;

      const baseUrl = isTokenized
        ? "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized"
        : "https://checkout.pay.bka.sh/v1.2.0-beta";

      const token = await this.getBkashAccessToken(
        baseUrl,
        appKey,
        appSecret,
        username,
        password
      );

      const paymentCreateURL = isTokenized
        ? "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/execute"
        : `https://checkout.pay.bka.sh/v1.2.0-beta/checkout/payment/execute/${paymentID}`;

      const body = isTokenized ? { paymentID } : {};

      console.log({ paymentCreateURL });
      const response = await axios.post(`${paymentCreateURL}`, body, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-app-key": appKey,
        },
      });

      return response.data;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }
}
