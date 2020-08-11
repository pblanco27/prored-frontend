import React from "react";
import $ from "jquery";

/**
 * * Consiste de un botón capaz de redirigir al
 * * usuario al principio de la página inicial
 */
export default function ScrollTop() {
  var scrollTop = document.getElementById("scrollTop");

  window.onscroll = () => {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollTop.style.display = "block";
    } else {
      scrollTop.style.display = "none";
    }
  }

  const handleClick = () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  };

  return (
    <button onClick={handleClick} id="scrollTop" title="Ir arriba">
      <i class="fas fa-arrow-up"></i>
    </button>
  );
}
