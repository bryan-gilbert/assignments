use bookazon;

SELECT 
   bookId, yr, SUM(quantity * cost) AS totalSales, SUM(quantity ) AS totalUnits
FROM
    LineItems items
        INNER JOIN
    (SELECT 
        id, custId, YEAR(STR_TO_DATE(date, '%Y-%m-%d')) AS yr
    FROM
        Orders) orders ON orders.id = items.orderId
GROUP BY bookId, yr
ORDER BY SUM(quantity * cost), SUM(quantity)