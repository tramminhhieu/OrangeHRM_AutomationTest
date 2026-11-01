import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL ?? "https://opensource-demo.orangehrmlive.com",

  // Chỉ khi ghi HEADLESS=false thì mới hiện browser; không khai báo thì mặc định chạy ẩn
  headless: process.env.HEADLESS !== "false",
  slowMo: Number(process.env.SLOW_MO ?? 0),
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT ?? 30000),

  users: {
    Admin: {
      username: process.env.ADMIN_USERNAME ?? "",
      password: process.env.ADMIN_PASSWORD ?? "",
    },
    ESS: {
      username: process.env.ESS_USERNAME ?? "",
      password: process.env.ESS_PASSWORD ?? "",
    },
  },
};
