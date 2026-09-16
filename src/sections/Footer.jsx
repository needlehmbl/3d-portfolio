import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
            {/* <a href="/"></a> */}
        </div>
        <div className="socials">
            {socialImgs.map((img)=>(
                <a className="icon" target="_blank" href={img.url} key={img.url}>
                    <img src={img.imgPath} alt="social" loading="lazy" decoding="async" />
                </a>
            ))}
        </div>
        <div className="flex flex-col justify-center">
            <p className="text-center md:text-end">© {new Date().getFullYear()} Ernest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
