import request from "@/request/index.js";

export function getWeather(data) {
    return new Promise((resolve, reject) => {
        getCityNameInfo().then((res) => {
            resolve(
                request(
                    `http://wthrcdn.etouch.cn/weather_mini`,
                    "GET",
                    {
                        city: /省(\S*)市/.exec(res.cname)[1],
                        ...data,
                    },
                    1,
                    {
                        withCredentials: false,
                    }
                )
            );
        });
    });
}

export function getCityNameInfo() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "http://pv.sohu.com/cityjson?ie=utf-8";
        script.type = "text/javascript";
        script.id = "cityjson";
        document.body.appendChild(script);
        script.onload = (res) => {
            resolve(returnCitySN);
            returnCitySN = null;
            document.body.removeChild(document.querySelector("#cityjson"));
        };
    });
}
