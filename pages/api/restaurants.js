// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const restaurants = [
    {
      name: "Chick-Fil-A",
      hours: {
        "M-T": {
          open: "10:30 AM",
          close: "6:00 PM",
        },
        F: {
          open: "10:30 AM",
          close: "3:00 PM",
        },
        "S-S": {
          open: null,
          close: null,
          current: false,
        },
      },
      image: "/assets/restaurants/chick-fil-a.jpg",
      link: "https://goo.gl/maps/h86wkkoe8XtnvoKg8",
      color: "#a00000",
    },
    {
      name: "Einstein's",
      hours: {
        "M-T": {
          open: "7:30 AM",
          close: "3:00 PM",
        },
        F: {
          open: "7:30 AM",
          close: "2:00 PM",
        },
        "S-S": {
          open: null,
          close: null,
          current: false,
        },
      },
      image: "/assets/restaurants/einsteins.jpg",
      link: "https://goo.gl/maps/nTg1dEP7Xikz7Bv3A",
      color: "#6f5e00",
    },
    {
      name: "Starbucks",
      hours: {
        "M-T": {
          open: "7:30 AM",
          close: "3:00 PM",
        },
        F: {
          open: "7:30 AM",
          close: "3:00 PM",
        },
        "S-S": {
          open: null,
          close: null,
          current: false,
        },
      },
      image: "/assets/restaurants/starbucks.jpg",
      link: "https://goo.gl/maps/BYP1dH3bNZihewrv8",
      color: "#004302",
    },
    {
      name: "Corner Grill",
      hours: {
        "M-T": {
          open: "4:30 PM",
          close: "8:30 PM",
        },
        F: {
          open: null,
          close: null,
          current: false,
        },
        "S-S": {
          open: null,
          close: null,
          current: false,
        },
      },
      image: "/assets/restaurants/corner.jpg",
      link: "https://goo.gl/maps/fvEkQuiK426JHWtZA",
      color: "#000c43",
    },
  ];
  const generateDate = (time) => {
    return (
      new Date(
        new Date().toDateString("en-US", { timeZone: "CST" }) +
          ", " +
          time +
          " CST"
      ) - 3600000
    );
  };
  const json = { restaurants: [] };
  const date = new Date(new Date().toLocaleString("en-US", {}));
  const dow = date.getDay();
  restaurants.forEach((rr, i) => {
    let hours = {};
    if (rr.hours) {
      if (dow >= 1 && dow <= 4) {
        hours = rr.hours["M-T"];
      } else if (dow == 5) {
        hours = rr.hours.F;
      } else {
        hours = rr.hours["S-S"];
      }
    }
    if (hours.open) {
      let open = generateDate(hours.open);
      let close = generateDate(hours.close);
      console.log(date.getTime(), open);
      if (date.getTime() >= open && date.getTime() <= close) {
        hours.current = true;
      } else {
        hours.current = false;
      }
    }
    rr.hours = hours;
    json.restaurants.push(rr);
  });
  res.setHeader("Cache-Control", "max-age=30, public").status(200).json(json);
}
