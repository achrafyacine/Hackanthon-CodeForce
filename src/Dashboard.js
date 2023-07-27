
import './dashboard.css';
import React, { useState, useEffect } from 'react';


function Dashboard() {

  const [projectCount, setProjectCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [utiCount, setUtiCount] = useState(0);

  useEffect(() => {
    // Effectuez ici votre requête pour compter le nombre d'insertions dans ProjectHac__c
    fetch('https://our-dev-ed.develop.my.salesforce.com/services/data/v51.0/query?q=SELECT COUNT() FROM User', {
      headers: {
        Authorization: 'Bearer 00D8e000000SiXZ!ARkAQEvqk4.wDcdQ86561346Ts4mT_4CyblmoJBuhHXGMVBw78z_MICrQNBwQxCDxVTPmCvPj_CgnyCTLO9c0TgkcOA_wgvG', // Remplacez YOUR_ACCESS_TOKEN par votre jeton d'accès Salesforce valide
      },
    })
      .then(response => response.json())
      .then(data => {
        const count = data.totalSize; // Obtenez le nombre total d'insertions
        setUtiCount(count); // Met à jour le nombre de projets
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nombre de projets :', error);
      });
  }, []);
  useEffect(() => {
    // Effectuez ici votre requête pour compter le nombre d'insertions dans ProjectHac__c
    fetch('https://our-dev-ed.develop.my.salesforce.com/services/data/v51.0/query?q=SELECT COUNT() FROM ProjectHac__c', {
      headers: {
        Authorization: 'Bearer 00D8e000000SiXZ!ARkAQEvqk4.wDcdQ86561346Ts4mT_4CyblmoJBuhHXGMVBw78z_MICrQNBwQxCDxVTPmCvPj_CgnyCTLO9c0TgkcOA_wgvG', // Remplacez YOUR_ACCESS_TOKEN par votre jeton d'accès Salesforce valide
      },
    })
      .then(response => response.json())
      .then(data => {
        const count = data.totalSize; // Obtenez le nombre total d'insertions
        setProjectCount(count); // Met à jour le nombre de projets
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nombre de projets :', error);
      });
  }, []);
  useEffect(() => {
    // Effectuez ici votre requête pour compter le nombre d'insertions dans ProjectHac__c
    fetch('https://our-dev-ed.develop.my.salesforce.com/services/data/v51.0/query?q=SELECT COUNT() FROM User_Story__c', {
      headers: {
        Authorization: 'Bearer 00D8e000000SiXZ!ARkAQEvqk4.wDcdQ86561346Ts4mT_4CyblmoJBuhHXGMVBw78z_MICrQNBwQxCDxVTPmCvPj_CgnyCTLO9c0TgkcOA_wgvG', // Remplacez YOUR_ACCESS_TOKEN par votre jeton d'accès Salesforce valide
      },
    })
      .then(response => response.json())
      .then(data => {
        const count = data.totalSize; // Obtenez le nombre total d'insertions
        setUserCount(count); // Met à jour le nombre de projets
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nombre de projets :', error);
      });
  }, []);
  return (
    <>

      <div id="main">
        <div className="head">
          <div className="col-div-6">
            <span style={{ fontSize: '20px', cursor: 'pointer', color: 'Black' }} className="nav"></span>
          </div>
        
          
          <div className="clearfix"></div>
        </div>

        <div className="clearfix"></div>
        <br />

        <div className="col-div-3">
          <div className="box">
            <p>{userCount}<br /><span>User Story</span></p>
            <i className="fa fa-users box-icon"></i>
          </div>
        </div>
        <div className="col-div-3">
          <div className="box">
          <p>{projectCount}<br /><span>Projects</span></p>
            <i className="fa fa-list box-icon"></i>
          </div>
        </div>
        <div className="col-div-3">
          <div className="box">
            <p>{utiCount}<br /><span>Users</span></p>
            <i className="fa fa-shopping-bag box-icon"></i>
          </div>
        </div>
        <div className="col-div-3">
          <div className="box">
            <p>78<br /><span>Tasks</span></p>
            <i className="fa fa-tasks box-icon"></i>
          </div>
        </div>
        <div className="clearfix"></div>
        <br /><br />
        <div className="col-div-8">
          <div className="box-8">
            <div className="content-box">
              <p>Top Selling Projects <span>Sell All</span></p>
              <br />
              <table>
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                </tr>
                <tr>
                  <td>Ernst Handel</td>
                  <td>Roland Mendel</td>
                  <td>Austria</td>
                </tr>
                <tr>
                  <td>Island Trading</td>
                  <td>Helen Bennett</td>
                  <td>UK</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div className="col-div-4">
          <div className="box-4">
            <div className="content-box">
              <p>Total Sale <span>Sell All</span></p>

              <div className="circle-wrap">
                <div className="circle">
                  <div className="mask full">
                    <div className="fill"></div>
                  </div>
                  <div className="mask half">
                    <div className="fill"></div>
                  </div>
                  <div className="inside-circle"> 70% </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>
      </div>

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script>
        {`
          $(".nav").click(function(){
            $("#mySidenav").css('width','70px');
            $("#main").css('margin-left','70px');
            $(".logo").css('visibility', 'hidden');
            $(".logo span").css('visibility', 'visible');
            $(".logo span").css('margin-left', '-10px');
            $(".icon-a").css('visibility', 'hidden');
            $(".icons").css('visibility', 'visible');
            $(".icons").css('margin-left', '-8px');
            $(".nav").css('display','none');
            $(".nav2").css('display','block');
          });

          $(".nav2").click(function(){
            $("#mySidenav").css('width','300px');
            $("#main").css('margin-left','300px');
            $(".logo").css('visibility', 'visible');
            $(".icon-a").css('visibility', 'visible');
            $(".icons").css('visibility', 'visible');
            $(".nav").css('display','block');
            $(".nav2").css('display','none');
          });
        `}
      </script>
    </>
  );
}

export default Dashboard;
