const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');

async function gerarNotaFiscal(dadosNota) {
    const doc = new PDFDocument();

    // Nome do arquivo PDF
    const nomeArquivo = `nota_fiscal_${dadosNota.numero}.pdf`;
    const stream = fs.createWriteStream(nomeArquivo);
    doc.pipe(stream);

    // Cabeçalho
    doc.fontSize(18).text("Nota Fiscal", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Número: ${dadosNota.numero}`);
    doc.text(`Data: ${dadosNota.data}`);
    doc.text(`Cliente: ${dadosNota.cliente}`);
    doc.moveDown();

    // Itens
    doc.fontSize(14).text("Itens:", { underline: true });
    
    dadosNota.itens.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.descricao} - R$ ${item.valor.toFixed(2)}`);
    });

    doc.moveDown();

    // Total
    const total = dadosNota.itens.reduce((acc, item) => acc + item.valor, 0);
    doc.fontSize(14).text(`Total: R$ ${total.toFixed(2)}`, { align: "right" });
    doc.moveDown();

    // Gerar QR Code de pagamento
    const codigoPagamento = `https://pagamento.fake.com/?id=${dadosNota.numero}`;
    const qrCodeImage = await QRCode.toDataURL(codigoPagamento);

    // Adicionar QR Code ao PDF
    doc.fontSize(14).text("Código de Pagamento:", { underline: true });
    doc.image(qrCodeImage, { width: 100, align: "center" });
    doc.moveDown();

    // Finalizar PDF
    doc.end();

    return nomeArquivo;
}

// Exemplo de uso
const dadosNota = {
    numero: "12345",
    data: "12/02/2025",
    cliente: "João Silva",
    itens: [
        { descricao: "Produto 1", valor: 50.00 },
        { descricao: "Produto 2", valor: 30.00 }
    ]
};

gerarNotaFiscal(dadosNota)
    .then(nomeArquivo => console.log(`Nota fiscal gerada: ${nomeArquivo}`))
    .catch(err => console.error("Erro ao gerar nota fiscal:", err));

module.exports = gerarNotaFiscal