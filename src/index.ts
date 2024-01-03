#! /usr/bin/env node
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
	.action(async ({ city, all }: any) => {
		try {
			if (all) {
				const resp = await axios.get(
					`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&tp=15&key=${process.env.WEATHER_KEY}`,
				);
				const days = resp.data.forecast.forecastday[0].hour.map(
					(dayTime: any) => {
						return {
							Час: dayTime.time ? dayTime.time : null,
							Температура: dayTime.temp_c ? dayTime.temp_c : null,
							"Вітер(км/год)": dayTime.wind_kph ? dayTime.wind_kph : null,
							"Погодні умови": dayTime.condition.text
								? dayTime.condition.text
								: null,
						};
					},
				);
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

			const resp = await axios.get(
				`https://api.weatherapi.com/v1/current.json?q=${city}&lang=ua&key=${process.env.WEATHER_KEY}`,
			);
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
		} catch (error: any) {
			console.log(error.message);
		}
	});

program.parse();
