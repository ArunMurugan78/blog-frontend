import React , {useEffect} from "react";
import './home.css';
import $ from 'jquery';
import NavBar from './layout/navbar';
import {FaQuoteLeft,FaQuoteRight} from 'react-icons/fa';
import {Container,Row,Col} from 'react-bootstrap';
function Home() {
  useEffect(()=>{
    $(document).ready(function() {
      var scroll_start = 0;
      
      var startchange = $('#startchange');
      var offset = startchange.offset();
      $(window).scroll(function() {
          scroll_start = $(this).scrollTop();
          if (scroll_start > offset.top) {
              $('#profileIcon').addClass('themeblack');
              $('#navbar').addClass('themeblack');

              $('#navbar').removeClass('themegreen');

              $('#profileIcon').removeClass('themegreen');
          } else {
              $('#navbar').addClass('themegreen');
              $('#profileIcon').addClass('themegreen');
              $('#navbar').removeClass('themeblack');

              $('#profileIcon').removeClass('themeblack');
          }
      });
  });
  },[])
  return (
    <div>
      <NavBar />
  <div   style={{backgroundColor:'#EEEEEE',marginTop:'60px'}}>
      <div style={{color:'#222831',backgroundColor:'#00adb5'}} className="p-4">
       <h1 className="display-3">
         Welcome to Coder's Blog !
       </h1>
       <p   id="startchange">
         This is a blog based on Programming . Write your first Blog Now !
         </p>
      </div>
{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00adb5" fill-opacity="1" d="M0,0L720,192L1440,96L1440,0L720,0L0,0Z"></path></svg>
    */}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#00adb5" fill-opacity="1" d="M0,96L60,85.3C120,75,240,53,360,64C480,75,600,117,720,138.7C840,160,960,160,1080,149.3C1200,139,1320,117,1380,106.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
</svg>
<div className="h1 text-center">
<FaQuoteLeft/><span className="mx-4">The Best Way to Learn Is to Teach !</span><FaQuoteRight/>
</div>
<p className="text-center">
  -- oppenheimer
</p>
<Container fuild style={{backgroundColor:"#393e46"}}>
<Row>
  <Col>
  </Col>
</Row>
</Container >
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque egestas congue quisque egestas diam. Donec pretium vulputate sapien nec sagittis aliquam. Ultricies integer quis auctor elit sed. Massa sed elementum tempus egestas sed sed risus. Viverra ipsum nunc aliquet bibendum enim. Nunc sed augue lacus viverra vitae congue. Ante in nibh mauris cursus mattis molestie a iaculis at. Pellentesque habitant morbi tristique senectus et netus et. Malesuada pellentesque elit eget gravida. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Neque laoreet suspendisse interdum consectetur. Tristique senectus et netus et malesuada fames ac.

Lectus urna duis convallis convallis tellus id interdum velit laoreet. Hendrerit dolor magna eget est. Nullam ac tortor vitae purus faucibus ornare. Eget felis eget nunc lobortis mattis aliquam. Quisque egestas diam in arcu cursus euismod quis. Commodo ullamcorper a lacus vestibulum sed arcu non. Nunc non blandit massa enim nec dui. Venenatis urna cursus eget nunc. Elementum eu facilisis sed odio morbi quis commodo odio aenean. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Interdum varius sit amet mattis. In dictum non consectetur a erat nam at. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Lectus arcu bibendum at varius. Enim eu turpis egestas pretium aenean pharetra magna. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere.

Viverra tellus in hac habitasse platea. Aenean sed adipiscing diam donec adipiscing tristique. Ultricies mi eget mauris pharetra et ultrices neque. Commodo ullamcorper a lacus vestibulum sed arcu non. Senectus et netus et malesuada. Ullamcorper sit amet risus nullam eget felis eget. Tristique et egestas quis ipsum suspendisse. Mauris a diam maecenas sed enim ut sem viverra. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Sed cras ornare arcu dui vivamus. Lobortis elementum nibh tellus molestie nunc non blandit. Duis ut diam quam nulla porttitor. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Cum sociis natoque penatibus et magnis dis parturient. Quis varius quam quisque id diam vel quam elementum. Dolor magna eget est lorem. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget.
 </div>
 </div>
  );
}

export default Home;
