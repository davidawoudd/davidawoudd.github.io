// Function to search and highlight text
function searchAndHighlight() {
    // Clear previous highlights
    var oldHighlights = document.querySelectorAll('.highlight');
    oldHighlights.forEach(function(node) {
      node.outerHTML = node.innerHTML; // Replace the highlight wrapper with its content only
    });
  
    // Get the search text
    var searchText = document.getElementById('searchText').value;
    if (searchText) {
      // Create a regular expression for whole words only, escaping special characters
      var regExp = new RegExp('\\b' + searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'gi');
      var firstMatch = null; // Variable to store the first match element
  
      // Recursive function to search and highlight text nodes
      function searchNodes(node) {
        if (node.nodeType === 3) { // Text node
          var match = node.nodeValue.match(regExp);
          if (match) {
            var span = document.createElement('span');
            span.className = 'highlight';
            span.innerHTML = node.nodeValue.replace(regExp, '<span class="highlight">$&</span>');
  
            // Replace the text node with the new span element
            node.parentNode.replaceChild(span, node);
  
            // If firstMatch is null, set it to the first highlighted element
            if (!firstMatch) {
              firstMatch = span.querySelector('.highlight');
            }
          }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') { // Element node, ignore SCRIPT/STYLE
          Array.from(node.childNodes).forEach(searchNodes);
        }
      }
  
      // Start the search from the body of the page
      searchNodes(document.body);
  
      // Scroll to the first match
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert('No matches found.');
      }
    }
  }
  
  // Function to handle the Enter key press
  function handleKeyPress(event) {
    var key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13) {
      searchAndHighlight(); // Call the search function
    }
  }
  