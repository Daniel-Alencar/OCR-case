'use client';

interface Producer {
  id: number;
  name: string;
  phone: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  zipCode: string;
  culture?: string;
  plantationSize?: string;
  consultantId: number;
  images: { id: number; producerId: number; imageData: string }[];
}

interface props {
  producer: Producer;
}

export default function ProducerImages({ producer }: props) {

  function bytesToBase64(byteArray: Uint8Array): string {
    let binary = '';
    // Processa em blocos menores
    const chunkSize = 8192;
    for (let i = 0; i < byteArray.length; i += chunkSize) {
      binary += String.fromCharCode(...byteArray.slice(i, i + chunkSize));
    }
    return btoa(binary);
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div
            key={producer && producer.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              width: '100%',
            }}
          >
            <p className="mb-3">
              Imagens da plantação
            </p>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
              {producer && producer.images.length > 0 ? (
                producer.images.map((image) => {
                  // Verificar e processar o imageData
                  const byteArray = new Uint8Array(
                    image.imageData.split(',').map((byte) => parseInt(byte, 10))
                  );
                  const base64Image = `data:image/png;base64,${bytesToBase64(byteArray)}`;

                  return (
                    <img
                      key={image.id}
                      src={base64Image}
                      alt={`Imagem do produtor ${producer.name}`}
                      style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  );
                })
              ) : (
                <p>Sem imagens.</p>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
