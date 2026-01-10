import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import './footer.css'
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className=" text-neutral-content px-6 py-14 bg-transparent rounded-tr-4xl rounded-tl-4xl"
    >
     
      <div style={{ color: 'var( --text-main)' }} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

      
        <aside className="lg:col-span-2">
          <h2 style={{ color: 'var( --text-main)' }} className="text-2xl font-bold text-white">AssetVerse</h2>
          <p className="max-w-md text-sm mt-3 text-gray-300 leading-relaxed">
            Smart Corporate Asset & HR Management Platform to track, assign, and
            manage company resources with complete transparency and control.
          </p>

         
          <div className="flex gap-4 mt-5">
            <a className="btn btn-circle btn-sm btn-outline">
              <FaFacebookF />
            </a>
            <a className="btn btn-circle btn-sm btn-outline">
              <FaLinkedinIn />
            </a>
            <a className="btn btn-circle btn-sm btn-outline">
              <FaTwitter />
            </a>
          </div>
        </aside>

    
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <br></br>
          <Link to="/about" className="link link-hover">About</Link>
          <br></br>
          <Link to="/packages" className="link link-hover">Packages</Link>
          <br></br>
          <Link to="/contact" className="link link-hover">Contact</Link>
        </nav>

       
        <nav className="flex-col gap-4">
          <h6 className="footer-title ">Services</h6>
          <Link to="/dashboard/assets" className="link link-hover">
            Asset Management
          </Link>
          <br></br>
          <Link to="/join" className="link link-hover">
            Join as Employee
          </Link>
          <br></br>
             <Link to="/hr" className="link link-hover">
            Join as HR
          </Link>
          <br></br>
          <Link to="/dashboard/requests" className="link link-hover">
            Asset Requests
          </Link>
          <br></br>
          <Link to="/analytics" className="link link-hover">
            Analytics & Reports
          </Link>
        </nav>

    
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms" className="link link-hover">Terms of Use</Link>
          <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
          <Link to="/cookies" className="link link-hover">Cookie Policy</Link>
        </nav>

       
        <nav>
          <h6 className="footer-title">Contact</h6>
          <p className="text-sm">Email: sopno263@gmail.com</p>
          <p className="text-sm">Phone: 01779616662</p>
          <p className="text-sm">Dhaka, Bangladesh</p>
        </nav>
      </div>

      {/* ✅ Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} AssetVerse.Made by <span className="aluu">Mistii Aluuu</span>.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
