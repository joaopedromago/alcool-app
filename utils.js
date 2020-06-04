const formatDate = dateParam => {
  const date = new Date(dateParam);

  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  const dd = date.getDate();
  const MM = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  return `${hh}:${mm}:${ss} do dia ${dd}/${MM}/${yyyy}`;
};

const getRecomendationDate = dateParam => {
  const date = new Date(dateParam);

  date.setHours(date.getHours() + 5);

  return formatDate(date);
};

const getGraphData = counts => {
  if (!counts || !counts.length) return null;

  const data =
    counts &&
    counts.reduce((prev, curr) => {
      const date = curr.date.split('T')[0];
      const dateToSum = prev[date];

      if (!dateToSum) {
        return {...prev, [date]: 1};
      }

      return {...prev, [date]: dateToSum + 1};
    }, []);

  const keys = Object.keys(data);
  const values = Object.values(data);

  return {keys, values};
};

export default {formatDate, getRecomendationDate, getGraphData};
