function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active');

    // Scroll to the selected section
    selectedSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
    const memoryForm = document.getElementById('memory-form');
    const memoryInput = document.getElementById('memory-input');
    const memoryList = document.getElementById('memory-list');

    // Load memories from localStorage on page load
    const savedMemories = JSON.parse(localStorage.getItem('sharedMemories')) || [];
    if (savedMemories.length > 0) {
        memoryList.querySelector('p').remove(); // Remove "No memories shared yet" message
        savedMemories.forEach(memory => addMemoryToList(memory));
    }

    // Handle form submission
    memoryForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission from reloading the page

        const memoryText = memoryInput.value.trim();
        if (memoryText) {
            // Add memory to the list
            addMemoryToList(memoryText);

            // Save memory to localStorage
            savedMemories.push(memoryText);
            localStorage.setItem('sharedMemories', JSON.stringify(savedMemories));

            // Clear input field
            memoryInput.value = '';
        }
    });

    // Add memory to the memory list in the DOM
    function addMemoryToList(memory) {
        const newMemory = document.createElement('p');
        newMemory.textContent = memory;
        memoryList.appendChild(newMemory);
    }
});
