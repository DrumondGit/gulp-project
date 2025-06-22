function formatarData(data) {
  if (!data) return "(não finalizado)";
  return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth()+1).toString().padStart(2, '0')}/${data.getFullYear()}`;
}

module.exports = {
  formatarData
};
