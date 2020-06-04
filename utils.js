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

export default {formatDate, getRecomendationDate};
