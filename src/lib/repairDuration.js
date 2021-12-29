export const repairDuration = (data) => {
  const regSec = /(\d+)S/;
  const regMin = /(\d+)M/;
  const regHour = /(\d+)H/;

  const rawDuration = [
    regHour.exec(data) ? +regHour.exec(data)[1] : 0,
    regMin.exec(data) ? +regMin.exec(data)[1] : 0,
    regSec.exec(data) ? +regSec.exec(data)[1] : 0,
  ];

  const duration = rawDuration
    .map((item, index) => {
      if (item !== 0 || index !== 0)
        return item.toLocaleString('id-ID', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
      return null;
    })
    .filter((item) => item);

  return duration.join(':');
};
