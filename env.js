const z = require('zod');
const packageJSON = require('./package.json');
const path = require('path');
const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

const BUNDLE_ID = 'com.brsign.brsignrn'; // ios bundle id
const PACKAGE = 'com.brsign.brsignrn'; // android package name
const NAME = 'brsign-rn'; // app name
const EXPO_ACCOUNT_OWNER = 'brsign'; // expo account owner
const EAS_PROJECT_ID = '97eb41a5-fe8b-4c03-8e04-d60cba512502'; // eas project id
const SCHEME = 'brsign-rn'; // app scheme

/**
 * 根据当前环境变量 APP_ENV 为名称添加后缀。
 * 如果是生产环境，则返回原始名称；否则返回带环境后缀的名称。
 * @param {string} name - 原始名称
 * @returns {string} - 处理后的名称
 */
const withEnvSuffix = (name) => {
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`;
};

/**
 * 定义客户端环境变量的校验模式。
 */
const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  SCHEME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  // 在此处添加客户端环境变量
  API_URL: z.string(),
});

/**
 * 定义构建时环境变量的校验模式。
 */
const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),
  // 在此处添加环境变量
  SECRET_KEY: z.string(),
});

/**
 * 收集客户端环境变量。
 */
const _clientEnv = {
  APP_ENV,
  NAME: NAME,
  SCHEME: SCHEME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  // 在此处添加环境变量
  API_URL: process.env.EXPO_PUBLIC_API_URL,
};

/**
 * 收集构建时环境变量。
 */
const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID,
  // 在此处添加环境变量
  SECRET_KEY: process.env.EXPO_PUBLIC_SECRET_KEY,
};

/**
 * 合并客户端和构建时环境变量。
 */
const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

/**
 * 合并客户端和构建时环境变量的校验模式。
 */
const merged = buildTime.merge(client);
/**
 * 检查环境变量解析是否失败，如果失败则输出错误信息并抛出异常。
 */
const parsed = merged.safeParse(_env);

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -c flag to clear the cache.`
  );
  throw new Error(
    'Invalid environment variables, Check terminal for more details '
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
  withEnvSuffix,
};
