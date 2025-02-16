import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { RolesEnum, collectionNames } from "../constant";
import { ClientSession, Model, Types } from "mongoose";
import { User } from "./schema/user.schema";
import { CustomBadRequest, CustomValidationPipe } from "../common";
import { ResetPasswordDto } from "./dto/reset-pass.dto";
import { ResetPasswordByNumberDto } from "./dto/reset-pass-by-number-dto";
import { UtilService } from "../common/services/utils.service";
import { compare } from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(collectionNames.USER)
    private readonly userModel: Model<User>,
    private readonly utilService: UtilService
  ) {}

  /**
   * create user
   * @param createUserDto
   * @param session
   * @returns user
   */
  async create(
    createUserDto: CreateUserDto,
    session: ClientSession
  ): Promise<User> {
    await CustomValidationPipe([createUserDto], CreateUserDto);

    //check if user already exists
    const hasUser = await this.getUserByMobile(createUserDto.mobile);

    if (hasUser)
      throw new CustomBadRequest("Phone number already exists", "mobile");

    const user = new this.userModel(createUserDto);
    return user.save({ session });
  }

  /**
   * get user by id
   * @param userId
   * @returns Promise<User>
   */
  async getUserById(userId: Types.ObjectId): Promise<User> {
    return this.userModel.findById(userId);
  }

  async deleteUserById(
    user: Types.ObjectId,
    session: ClientSession
  ): Promise<User> {
    console.log({ user });

    const userDATA = this.userModel.findByIdAndDelete(
      { _id: user },
      { session }
    );
    console.log({ userDATA });

    return userDATA;
  }

  /**
   * get user by mobile
   * @param mobile
   * @returns Promise<User>
   */
  async getUserByMobile(mobile: string): Promise<User> {
    return this.userModel.findOne({ mobile });
  }

  async getUserByMobileAndResellerId(
    mobile: string,

    reseller: Types.ObjectId
  ): Promise<User> {
    const data = this.userModel.findOne({ mobile, reseller });

    return data;
  }

  async getUserByMobileAndSubResellerId(
    mobile: string,

    subReseller: Types.ObjectId
  ): Promise<User> {
    const data = this.userModel.findOne({ mobile, subReseller });

    return data;
  }

  /**
   * get user by query
   * @param query
   * @returns Promise<User>
   */
  async getUser(query: any): Promise<User> {
    return this.userModel.findOne(query);
  }

  /**
   * Get all users
   * @returns Promise<User[]>
   */

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({});
  }

  /**
   * get user details by id
   * @param userId
   * @returns Promise<User>
   */
  async getUserDetailsById(userId: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  /**
   * create merchant
   * @param createUserDto
   * @returns Promise<User>
   */
  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    try {
      //for validation checking
      await CustomValidationPipe([createUserDto], CreateUserDto);

      const admin = new this.userModel({
        ...createUserDto,
        role: RolesEnum.MERCHANT,
      });
      return admin.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * update user mobile
   * @param userId
   * @param mobile
   * @param session
   * @returns Promise<User>
   */
  async updateUserMobile(
    id: Types.ObjectId,
    mobile: string,
    session?: ClientSession
  ): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { mobile } },
      { new: true, ...(session && { session }) }
    );
    if (!user) throw new BadRequestException("User not found");
    return user;
  }

  async updateUserByMerchantId(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
    session?: ClientSession
  ): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { merchant: id },
      { $set: { ...updateUserDto } },
      { new: true, ...(session && { session }) }
    );

    if (!user) throw new BadRequestException("User not found");
    return user;
  }

  async updateUserByDistributorId(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
    session?: ClientSession
  ): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { distributor: id },
      { $set: { ...updateUserDto } },
      { new: true, ...(session && { session }) }
    );

    if (!user) throw new BadRequestException("User not found");
    return user;
  }

  async updateUserByDistributorAgnetId(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
    session?: ClientSession
  ): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { distributorAgent: id },
      { $set: { ...updateUserDto } },
      { new: true, ...(session && { session }) }
    );

    if (!user) throw new BadRequestException("User not found");
    return user;
  }

  /**
   * update user status
   * @param userId
   * @param status
   * @param session
   * @returns Promise<void>
   */
  async updateStatus(
    id: Types.ObjectId,
    status: string,
    session?: ClientSession
  ) {
    await this.userModel.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, ...(session && { session }) }
    );
  }

  /**
   * single Password reset option
   * @param userId
   * @param resetPasswordDto
   * @param session
   * @returns Promise<User>
   */

  async resetPasswordByToken(
    userId: Types.ObjectId,
    resetPasswordDto: ResetPasswordDto,
    session?: ClientSession
  ): Promise<User> {
    const user = await this.userModel.findOne({ _id: userId }).session(session);

    if (!user) {
      throw new BadRequestException("Invalid reset token or token expired");
    }

    // Check if the current password matches
    const isMatch = await compare(
      resetPasswordDto.currentPassword,
      user.password
    );
    if (!isMatch) {
      throw new BadRequestException("Current password is incorrect");
    }

    user.password = resetPasswordDto.newPassword;

    user.passwordUpdatedAt = new Date();

    // Save changes within the provided session
    await user.save({ session });

    return user;
  }

  async resetPasswordByNumber(
    resetPasswordByNumberDto: ResetPasswordByNumberDto
  ): Promise<User> {
    const user = await this.userModel.findOne({
      mobile: resetPasswordByNumberDto?.mobile,
    });

    console.log({ user });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const randomNumber = this.utilService.generateSixRandomNumber();

    // Update the password
    user.password = `SI-${randomNumber}`;
    user.passwordUpdatedAt = new Date();

    // Save changes
    await user.save();

    return user;
  }

  /**
   * delete user by id
   * @param userId
   * @param session
   * @returns Promise<User>
   */
  async deleteUser(
    userId: Types.ObjectId,
    session: ClientSession
  ): Promise<User> {
    return await this.userModel.findByIdAndDelete(userId, { session });
  }
}
