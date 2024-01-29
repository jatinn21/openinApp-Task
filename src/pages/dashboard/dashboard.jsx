import { Fragment, useState } from "react";
import Papa from "papaparse";

import "./dashboard.css";

export const Dashboard = () => {
  const [file, setFile] = useState([]);
  let hiddenInput;
  let uploadedFileContainer;
  let uploadBtn;

  function removeFile() {
    hiddenInput = document.querySelector("#csvFile");
    uploadedFileContainer = document.querySelector(".filename__container");
    uploadBtn = document.querySelector(".infoArea");

    uploadBtn.classList.remove("hidden");
    hiddenInput.value = "";
    uploadedFileContainer.classList.add("hidden");
  }

  function displayFileName(e) {
    hiddenInput = document.querySelector("#csvFile");
    uploadedFileContainer = document.querySelector(".filename__container");
    uploadBtn = document.querySelector(".infoArea");
    const fileNameBlock = document.querySelector(".uploaded__fileName");

    let filename = hiddenInput.value.split("\\").at(-1);

    uploadedFileContainer.classList.remove("hidden");
    uploadBtn.classList.add("hidden");
    fileNameBlock.textContent = filename;
  }

  function openInput(e) {
    hiddenInput = document.querySelector("#csvFile");
    hiddenInput.click();
  }

  function hideMenu(value, menu, closeBtn) {
    menu.style.left = value;
    closeBtn.classList.add("hidden");
  }

  function showMenu(value, menu, closeBtn) {
    menu.style.left = value;
    closeBtn.classList.remove("hidden");
  }

  function toggleMenu() {
    const menu = document.querySelector("nav");
    const closeBtn = document.querySelector(".menu__close_btn");
    menu.style.left === "-100%"
      ? showMenu(0, menu, closeBtn)
      : hideMenu("-100%", menu, closeBtn);
  }

  function uploadCsv(e) {
    e.preventDefault();
    hiddenInput = document.querySelector("#csvFile");
    const fileData = hiddenInput.files[0];
    Papa.parse(fileData, {
      header: true,
      complete: (result) => {
        setFile(result.data);
      },
    });
  }

  function fileDroped(e) {
    console.log("Inn");
    e.preventDefault();
    console.log(e.target.files);
  }

  return (
    <Fragment>
      <nav>
        <section className="nav__logo">
          <p>
            <span className="dashboard__logo"></span>
            <span className="dashboard__brandname">BASE</span>
          </p>
          <span
            className="material-symbols-outlined menu__close_btn hidden"
            onClick={toggleMenu}
          >
            close
          </span>
        </section>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            dashboard
          </span>
          <span className="dashboard__option_name">Dashboard</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            equalizer
          </span>
          <span className="dashboard__option_name">Upload</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            receipt_long
          </span>
          <span className="dashboard__option_name">Invoice</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            description
          </span>
          <span className="dashboard__option_name">Schedule</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            calendar_month
          </span>
          <span className="dashboard__option_name">Calendar</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            notifications
          </span>
          <span className="dashboard__option_name">Notification</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            settings
          </span>
          <span className="dashboard__option_name">Setting</span>
        </p>
      </nav>

      <header className="mobile__header ">
        <section className="menu__btn" onClick={toggleMenu}>
          <span className="material-symbols-outlined">menu</span>
          <p>
            <span className="dashboard__logo"></span>
            <span className="dashboard__brandname">BASE</span>
          </p>
        </section>
        <section>
          <span className="bell_icon material-symbols-outlined">
            notifications
          </span>
          <span className="profile_picture"></span>
        </section>
      </header>

      <section className="right__section-Dashboard">
        <section className="top__dashboard_right">
          <h1>Upload CSV</h1>
          <p className="top__dashboard_right--rightside">
            <span className="bell_icon material-symbols-outlined">
              notifications
            </span>
            <span className="profile_picture"></span>
          </p>
        </section>
        <section className="middle__dashboard_right">
          <p className="hidden">Upload CSV</p>
          <form
            action=""
            onDragOver={(e) => {
              console.log("asdkshabkh");
              e.preventDefault();
            }}
            onDrop={fileDroped}
          >
            <div>
              <img src="./assets/excel.png" alt="ecxel logo" />
              <p className="infoArea">
                Drop your excel sheet here or{" "}
                <span
                  className="browse__Button mainBtn"
                  id="browse__Button"
                  onClick={openInput}
                >
                  browse
                </span>
              </p>
              <p className="filename__container hidden">
                <span className="uploaded__fileName"></span>
                <br />
                <span
                  className="cross"
                  id="crossBtn"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={removeFile}
                >
                  Remove
                </span>
              </p>
            </div>
            <input
              type="file"
              className="hiddenInputFile"
              name="csvFile"
              id="csvFile"
              accept=".csv"
              onChange={displayFileName}
            />
            <button
              className="Upload__Button"
              id="Upload__Button"
              onClick={uploadCsv}
            >
              <span className="material-symbols-outlined">upload</span> Upload
            </button>
          </form>
        </section>

        <section>
          <div>
            <p style={{ fontSize: "2.5vh" }}>Uploads</p>
            <table>
              <thead>
                <tr>
                  <th>SI No.</th>
                  <th>Links</th>
                  <th>Prefix</th>
                  <th>Add Tags</th>
                  <th>Selected Tags</th>
                </tr>
              </thead>
              <tbody>
                {file.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.links}</td>
                      <td>{row.prefix}</td>
                      {/* <td>{row["select tags"]}</td> */}
                      <td>
                        <select>
                          <option defaultValue="Select Tag">Select tags</option>
                          {row["select tags"].split(",").map((value) => {
                            console.log(value);
                            return (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>{row["selected tags"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </Fragment>
  );
};
