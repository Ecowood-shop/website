function Details({ styles, t }) {
  return (
    <div className={styles.text}>
      <h1>{t("shipping method.shipping methods")}</h1>
      <hr />
      <p>* თბილისის მასშტაბით მიწოდება მოხდება 2-4 სამუშაო დღეში</p>
      <p>* რეგიონებში მიწოდება მოხდება 4-5 სამუშაო დღეში</p>
    </div>
  );
}

export default Details;
