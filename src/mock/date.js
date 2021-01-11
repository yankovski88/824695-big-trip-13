import dayjs from "dayjs";
// import dayjs from "dayjs";
export const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));

    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDateStart = () => {

    const maxDaysGap = 3;
    const daysGap = getRandomInteger(-maxDaysGap, 1);
    const dateStart = dayjs().add(daysGap, `day`).add(daysGap, `hour`).add(-maxDaysGap, `minute`).toDate();

    return dateStart;
};
const a = generateDateStart();
console.log(a);
const d = [{}, {}, {}]
