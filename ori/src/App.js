import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import {useState,useEffect} from 'react';


function App() {
  //.👇 is used to set state in virtualDOM
  const [ip,setIP] = useState('');
  function getIp(){
  $.getJSON( "https://geolocation-db.com/json/", function( data ) {
    setIP(data.IPv4)
    console.log(ip)
  });}
  const [det,setdet] = useState('');
  function getdet(){
    $.getJSON( "https://vpnapi.io/api/"+ip+"?key=271a2d3192dc45ecbc12191d8aafec44", function( data ) {
      setdet(data.security)
      console.log(det)
    });}
    const [prx,setprx] = useState('');
  function getproxy(){
    getdet();
    if(det.vpn)
      setprx("VPN");
    else if(det.proxy)
    setprx("Proxy");
    else if(det.tor)
    setprx("Tor");
    else if(det.relay)
    setprx("Relay");
    else
    setprx("None");
  }
  useEffect(()=>{
    //passing getData method to the lifecycle method
    getIp();
    getproxy();

},[])
  return (
    <React.Fragment>


    <h1>{ip}</h1>
    <h1>proxy:{prx}</h1>
    </React.Fragment>
  );
}

export default App;


