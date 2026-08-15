export const formateTime = (time: string) => {
    const [hoursStr, minutes] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${amPm}`;
};
