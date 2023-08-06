import CONFIGS from "../configs/configs";

export const calcTotalPage = (result, type) => {
  if (!result) return;
  const pageSize =
    type === "notice"
      ? CONFIGS.NOTICE_PAGESIZE
      : type === "news"
      ? CONFIGS.NEWS_PAGESIZE
      : null;
  const quotient = parseInt(result.total / pageSize);
  const remainder = parseInt(result.total % pageSize);
  const totalPage = quotient !== 0 && remainder === 0 ? quotient : quotient + 1;

  return totalPage;
};

// 몫 != 0 && 나머지 = 0 -> 몫
// 몫 != 0 && 나머지 != 0 -> 몫 + 1
// 몫 == 0 && 나머지 == 0 -> 1 (몫 + 1)
// 몫 == 0 && 나머지 != 0 -> 1 (몫 + 1)
