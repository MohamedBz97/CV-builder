
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates a multi-page PDF from an HTML element.
 * Handles content that exceeds one page by slicing the canvas image.
 */
export const generatePdf = async (element: HTMLElement, filename: string) => {
  const originalWidth = element.style.width;
  
  // Force width to match standard Letter size in pixels (at 96 DPI)
  // This ensures consistency between what the user sees and what is printed.
  element.style.width = '816px';

  try {
    // Small delay to ensure DOM layouts are finalized after width change
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality (approx 192 DPI)
      useCORS: true,
      logging: false,
      windowWidth: 816, // Ensure media queries render at this width
      height: element.scrollHeight, // Capture full scroll height
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Initialize PDF (A4 format)
    // A4 is 595.28 x 841.89 points
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate the height of the image when fitted to PDF width
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // If content overflows, add new pages
    while (heightLeft > 0) {
      position -= pdfHeight; // Shift the image up for the next page
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
  } catch (error) {
      console.error("PDF Generation failed:", error);
      throw error;
  } finally {
    // Restore original style
    element.style.width = originalWidth;
  }
};
