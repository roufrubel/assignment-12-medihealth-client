import { MdOutlineHealthAndSafety } from "react-icons/md";


const Footer = () => {
    return (
        <>
      <footer className="footer bg-neutral text-neutral-content p-10 mt-20">
      <nav>
        <h6 className="footer-title">Social Links</h6>
        <a className="link link-hover">Facebook</a>
        <a className="link link-hover">Youtube</a>
        <a className="link link-hover">Twitter</a>
        <a className="link link-hover">Instagram</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <form>
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="form-control">
          <label className="label">
            <span className="label-text text-neutral-content">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item input-xs" />
            <button className="btn btn-info btn-xs join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
        <div className="bg-neutral text-neutral-content py-6 text-xl font-bold px-10">
        <h2 className="flex items-center"><MdOutlineHealthAndSafety className="text-blue-600 text-xl mr-1"></MdOutlineHealthAndSafety>mediHealth</h2>
        </div>
    </>
    );
};

export default Footer;