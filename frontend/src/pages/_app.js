// pages/_app.js
import Layout from '../components/layers/Layouts';
import '../styles/globals.css'; 
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
