/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';

export class PasswordUtil {
  private static readonly SALT_ROUNDS = 10; // 推荐值：10-12（越高越安全但越慢）

  // 加密密码
  static async encrypt(password: string): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return await bcrypt.hash(password, salt);
    } catch (err) {
      throw new Error('密码加密失败');
    }
  }

  // 验证密码
  static async decrypt(plainText: string, hashedPassword: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return await bcrypt.compare(plainText, hashedPassword);
    } catch (error) {
      throw new Error('密码错误，请输入正确的密码');
    }
  }
}
