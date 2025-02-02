const form = document.getElementById("urlForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = document.getElementById("urlInput").value;

  if (!url) {
    resultDiv.textContext = "Skriv inn en gyldig nettside.";
    return;
  }

  resultDiv.textContent = "Processing...";

  try {
    const response = await fetch("/count-vi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) {
      throw new Error("Failed to get data");
    }

    const data = await response.json();
    resultDiv.textContent = `Ordet "vi" finnes ${data.count} ganger på nettsiden.`;
  } catch (error) {
    console.error(error);
    resultDiv.textContent = "Noe gikk galt.";
  }
});
