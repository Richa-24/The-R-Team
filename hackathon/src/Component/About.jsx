import React from "react";
import styles from "./Style.module.css";

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2018/10/Blue-Letter-s-modern-Logo-by-yahyaanasatokillah-580x387.jpg"
          width="200"
        />
        <h1 className={styles.logoName}>About</h1>
        <p className={styles.para}>
          To ease the pressure on students of submitting documents which require
          multiple signatures and authorizations and to make the entire process
          as simple as ordering your favourite dish from the restaurant we have
          come up with a solution. Using the templates given on the dashboard,
          you can select the type of document you wan to use from a variety of
          legal and commonly used documents and click on "Create New Doc", after
          this all you have to do is fill in your details and who you want to
          send it to and click on submit. We'll send you your document in a
          proper format and mail it to the concerned person who can approve or
          reject your document with a simple click. All the legalities are
          therefore simplified. Just one click and its done!
        </p>
      </>
    );
  }
}
