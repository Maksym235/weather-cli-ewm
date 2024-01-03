#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Command } = require("commander");
const axios = require("axios");
const program = new Command();
//94a040c94bab4dcabf9130808222712
program.name("get-weather").version("0.1");
program
    .command("weather")
    .description("Get weather information")
    .option("-c , --city <string>")
    .option("-a, --all")
    .action(({ city, all }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`hello ${city}`);
        if (all) {
            const resp = yield axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&tp=15&key=94a040c94bab4dcabf9130808222712`);
            const days = resp.data.forecast.forecastday[0].hour.map((dayTime) => {
                return {
                    Час: dayTime.time ? dayTime.time : null,
                    Температура: dayTime.temp_c ? dayTime.temp_c : null,
                    "Вітер(км/год)": dayTime.wind_kph ? dayTime.wind_kph : null,
                    "Погодні умови": dayTime.condition.text
                        ? dayTime.condition.text
                        : null,
                };
            });
            const weatherArray = [
                {
                    Місто: resp.data.location.name,
                    "Часовий пояс": resp.data.location.tz_id,
                    "Місцевий час": resp.data.location.localtime,
                    "Останнє оновлення": resp.data.current.last_updated,
                },
            ];
            return console.table(weatherArray), console.table(days);
        }
        const resp = yield axios.get(`https://api.weatherapi.com/v1/current.json?q=${city}&lang=ua&key=94a040c94bab4dcabf9130808222712`);
        // 			const currentWeather = `Місто:${resp.data.location.name},
        // Часовий пояс: ${resp.data.location.tz_id},
        // Місцевий час: ${resp.data.location.localtime},
        // Останнє оновлення: ${resp.data.current.last_updated},
        // температура (цельсій): ${resp.data.current.temp_c},
        // Опади: ${resp.data.current.condition.text}`;
        const weatherArray = [
            {
                Місто: resp.data.location.name,
                "Часовий пояс": resp.data.location.tz_id,
                "Місцевий час": resp.data.location.localtime,
                "Останнє оновлення": resp.data.current.last_updated,
                "температура (цельсій)": resp.data.current.temp_c,
                Опади: resp.data.current.condition.text,
            },
        ];
        console.table(weatherArray);
    }
    catch (error) {
        console.log(error.message);
    }
}));
program.parse();
//# sourceMappingURL=index.js.map