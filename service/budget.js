exports.getBudget = (req, res) => {
  const startDate = req.params.s_date.trim();
  const numOfDays = parseInt(req.params.n_day);
  const pattern = date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  console.log("new Reqeust", startDate, numOfDays)
  // input check
  if (startDate < 0 || !pattern.test(startDate)) {
    return res.json({
      err: "input invalid",
      cost: 0
    })
  }

  let currDay = new Date(startDate);
  let monToSun = currDay.getDay();
  let cost = 0;
  for (let i = 1; i <= numOfDays; i++) {
      // Bob only buys banans on his work days
      if (monToSun === 0 || monToSun === 6) {
          currDay.setDate(currDay.getDate() + 1);
          monToSun = currDay.getDay();
          continue;
      }
      // Add daily cost based on specific date
      const currDate = currDay.getDate();
      switch (true) {
          case currDate >= 1 && currDate <= 7:
                cost += 0.05;
                break;
          case currDate >= 8 && currDate <= 14:
                cost += 0.1;
                break;
          case currDate >= 15 && currDate <= 21:
                cost += 0.15;
                break;
          case currDate >= 22 && currDate <= 28:
                cost += 0.2;
                break;
          default:
                cost += 0.25;
      }
      currDay.setDate(currDay.getDate() + 1);
      monToSun = currDay.getDay();
  }

  return res.json({
    startDate: startDate,
    numOfDays: numOfDays,
    cost: cost.toFixed(2)
  })
}
