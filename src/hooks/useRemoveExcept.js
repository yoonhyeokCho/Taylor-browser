import { useEffect } from "react";

export const useRemoveExcept = (WebViewRef, target, type, root) => {
  // useEffect(() => {
    setTimeout(() => {
      WebViewRef?.current?.injectJavaScript(`
        // function removeElementsExcept(target, type) {
        //   let excludedElements = document.querySelectorAll((type === "id" ? "#" : type === "class" ? "." : "") + target);
        //   if (excludedElements.length === 0) {
        //     console.error('No elements matched the provided selector.');
        //     return;
        //   }
        //   let excludedElement = excludedElements[0];
        //   let parentComponent = excludedElement.parentElement;
        //   if (parentComponent) {
        //     let childComponents = parentComponent.children;
        //     for (let i = childComponents.length - 1; i >= 0; i--) {
        //       let child = childComponents[i];
        //       if (type === "id") {
        //         if (child.id !== target) {
        //           parentComponent.removeChild(child);
        //         }
        //       } else {
        //         if (!child.classList.contains(target)) {
        //           parentComponent.removeChild(child);
        //         }
        //       }
        //     }
        //   }
        //   let result = parentComponent.innerHTML;
        //   let parentElement = document.body;
        //   let childElements = Array.from(parentElement.children);
        //   childElements.forEach(function (child) {
        //     if (!excludedElement.contains(child)) {
        //       parentElement.removeChild(child);
        //     }
        //   });
        //   parentElement.innerHTML = result;
        // };
        // removeElementsExcept("${target}", "${type}");


        function removeElementsExcept(targetSelector) {
          // 원하는 대상 요소를 선택
          const targetElement = document.querySelectorAll("${target}");
          const stringElement = targetElement[0].outerHTML;
          document.body.innerHTML = stringElement;
          
        }
        removeElementsExcept('.my-target-class');

        
  
        
        
        
        
        true;
      `);
      // console.log(`
      // function removeElementsExcept(target, type) {
      //   let excludedElements = document.querySelectorAll((type === "id" ? "#" : ".") + target);
      //   if (excludedElements.length === 0) {
      //     console.error('No elements matched the provided selector.');
      //     return;
      //   }
      //   let excludedElement = excludedElements[0];
      //   let parentComponent = excludedElement.parentElement;
      //   if (parentComponent) {
      //     let childComponents = parentComponent.children;
      //     for (let i = childComponents.length - 1; i >= 0; i--) {
      //       let child = childComponents[i];
      //       if (type === "id") {
      //         if (child.id !== target) {
      //           parentComponent.removeChild(child);
      //         }
      //       } else {
      //         if (!child.classList.contains(target)) {
      //           parentComponent.removeChild(child);
      //         }
      //       }
      //     }
      //   }
      //   let result = parentComponent.innerHTML;
      //   let parentElement = document.body;
      //   let childElements = Array.from(parentElement.children);
      //   childElements.forEach(function (child) {
      //     if (!excludedElement.contains(child)) {
      //       parentElement.removeChild(child);
      //     }
      //   });
      //   parentElement.innerHTML = result;
      // };
      // removeElementsExcept("${target}", "${type}");
      // `)
    },100);
  // }, []);
};
