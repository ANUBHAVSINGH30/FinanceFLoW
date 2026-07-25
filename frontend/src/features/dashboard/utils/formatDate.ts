export const formatDate = (date: string) =>  {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
    }).format(new Date(date));
};

