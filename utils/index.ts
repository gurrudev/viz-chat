export const dateFormat = (str : any) =>{
    return new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(str);
}

export const timeFormat = (str : any) =>{
    return str?.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
}


