generateReport = (cars, maxPrice) =>
    cars
        .filter(car => car.price < maxPrice)
        .map(formatCar)
        .join('\n');