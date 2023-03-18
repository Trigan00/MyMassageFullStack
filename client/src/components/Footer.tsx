import "./../components/styles/style.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-wrapper">
          <div className="social vk">
            <a href="https://vk.com/lunnitsa9" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-vk fa-2x"></i>
            </a>
          </div>
          <div className="social telegram">
            <a
              href="https://t.me/elvira_prazdnikova"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-telegram fa-2x"></i>
            </a>
          </div>
          <div className="social whatsapp">
            <a
              href="https://wa.me/+79061192558"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-whatsapp fa-2x"></i>
            </a>
          </div>
        </div>
        <div className="info">
          <p>Праздникова Эльвира</p>
          <p>Все права защищены</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
