let oldTimestamp = Date.now();
let sameTimeCount = 0;

/**
 * 유니크 ID를 생성하는 함수. 동시에 1000개의 uid를 생성하는 것에 대응할 수 있습니다. 이는 싱글스레드에서만 유효합니다.
 * @returns Unique ID
 */
export const uid = () => {
  const timestamp = Date.now();
  sameTimeCount = oldTimestamp === timestamp ? sameTimeCount + 1 : 0;
  oldTimestamp = timestamp;

  return timestamp * 1000 + sameTimeCount;
};
