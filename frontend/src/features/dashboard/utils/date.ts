export const formatCurrentDate = () => {
    return new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(new Date());
};