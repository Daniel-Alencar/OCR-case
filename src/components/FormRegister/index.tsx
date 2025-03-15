import TextInput from './TextInput';
import SelectInput from './SelectInput';
import InfoField from './InfoField';
import ImageUploader from '../ImageUploader/page';
import { useState } from 'react';

const stateOptions = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

function FormRegister() {
  const [images, setImages] = useState<File[]>([]);
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a visibilidade do pop-up

  const submitForms = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataEvent = new FormData(event.target as HTMLFormElement);
    const formData = new FormData();

    let data = {
      name: formDataEvent.get('Nome') as string,
      phone: formDataEvent.get('Telefone/whatsapp') as string,
      street: formDataEvent.get('Rua') as string,
      cnpj: formDataEvent.get('CNPJ') as string,
      neighborhood: formDataEvent.get('Bairro') as string,
      city: formDataEvent.get('Cidade') as string,
      state: formDataEvent.get('Estado/UF') as string,
      number: formDataEvent.get('Número') as string,
      zipCode: formDataEvent.get('CEP') as string,
      culture: formDataEvent.get('Cultura') as string,
      plantationSize: formDataEvent.get('Tamanho da plantação') as string,
      necessity: formDataEvent.get('Necessidade') as string, // Adicionando campo necessity
    };

    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('cnpj', data.cnpj);
    formData.append('street', data.street);
    formData.append('neighborhood', data.neighborhood);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('number', data.number);
    formData.append('zipCode', data.zipCode);
    formData.append('culture', data.culture);
    formData.append('plantationSize', data.plantationSize);
    formData.append('necessity', data.necessity); // Enviando necessity no formData

    images.forEach((image) => {
      formData.append('images', image, image.name);
    });

    try {
      const response = await fetch('/api/producers', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao cadastrar produtor: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      alert(`Produtor cadastrado com sucesso! ID: ${result.id}`);
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
      alert('Erro inesperado. Tente novamente mais tarde.');
    }
  };

  // Função para abrir o pop-up
  const openPopup = () => {
    setShowPopup(true);
  };

  // Função para fechar o pop-up
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <form
      className="container bg-background rounded-custom-1 p-7 w-full flex flex-col gap-4 "
      onSubmit={(event) => submitForms(event)}
    >
      {' '}
      <h4 className="font-bold text-primary mb-5">Novo Produtor</h4>
      <div className="flex px-8 ">
        <div className="px-8 flex-1 grid grid-cols-2 gap-4 ">
          <TextInput label="Nome" placeholder="Digite seu nome" type="text" />
          <TextInput
            label="Telefone/whatsapp"
            type="number"
            placeholder="Digite seu telefone"
          />
          <TextInput label="CNPJ" type="text" placeholder="Insira seu CNPJ" />
          <TextInput
            label="Tamanho da plantação"
            placeholder="Digite o tamanho da propriedade em m²"
            type="number"
          />
          <TextInput // Alterado para campo de texto
            label="Cultura"
            placeholder="Digite a cultura"
            type="text"
          />
          <TextInput label="Rua" placeholder="Digite sua rua" type="text" />
          <TextInput
            label="Bairro"
            placeholder="Digite seu bairro"
            type="text"
          />
          <TextInput
            label="Cidade"
            placeholder="Digite sua cidade"
            type="text"
          />
          <TextInput label="CEP" placeholder="Insira seu CEP" type="text" />
          <SelectInput
            label="Estado/UF"
            placeholder="Selecione o Estado/UF"
            options={stateOptions}
          />
          <TextInput
            label="Número"
            placeholder="Digite o número"
            type="number"
          />
          <TextInput // Adicionando campo "Necessidade"
            label="Necessidade"
            placeholder="Digite a necessidade"
            type="text"
          />

          <InfoField label="ID" value="Produtor ID" />
          <ImageUploader onImagesChange={setImages} />
          {/* Adicionando campo de "Termos de Uso" */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms" className="text-sm">
              Eu aceito os{' '}
              <a href="#" onClick={openPopup} className="text-blue-500">
                Termos de Uso e a Política de Privacidade
              </a>
              .
            </label>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white font-thin text-xs py-3 px-12 rounded-lg w-2/6"
        >
          Cadastrar Produtor
        </button>
      </div>
      {/* Pop-up de Termos de Uso */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg w-1/3 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-xl mb-4">Termos de Uso</h2>
            <div className="text-sm">
              <p>
                <strong>1. Introdução</strong>
              </p>
              <p>
                Bem-vindo à Coep Vale! Estes termos de uso regulam a utilização
                da nossa plataforma digital, que conecta pequenos e médios
                produtores rurais com consultores especializados, visando
                otimizar processos, aumentar a eficiência no agronegócio e
                fomentar boas práticas agrícolas. Ao acessar ou utilizar a
                plataforma, o usuário concorda integralmente com estes Termos e
                com nossa Política de Privacidade.
              </p>
              <p>
                A plataforma Coep Vale é de exclusividade da empresa COEP VALE
                INOVA SIMPLES (I.S.), registrada sob o CNPJ 54.882.889/0001-07,
                com sede em Rua Reginaldo Alves Freitas, 90A, Cohab Massangano,
                Petrolina - PE, CEP 56310-808. Qualquer uso indevido ou fora das
                diretrizes estabelecidas nestes Termos poderá resultar em
                sanções e exclusão da plataforma.
              </p>

              <p>
                <strong>2. Definições</strong>
              </p>
              <p>
                2.1. Usuário: Qualquer pessoa que utilize a plataforma,
                incluindo produtores rurais, consultores e parceiros comerciais.
              </p>
              <p>
                2.2. Plataforma: O ambiente digital da Coep Vale, acessível via
                web ou dispositivos móveis, destinado à intermediação entre
                produtores e consultores.
              </p>
              <p>
                2.3. Consultor: Profissional cadastrado que oferece serviços
                especializados dentro da plataforma.
              </p>
              <p>
                2.4. Produtor: Agricultor, pecuarista ou empresa do setor
                agropecuário que busca consultoria ou suporte na plataforma.
              </p>
              <p>
                2.5. Serviços: As atividades prestadas pelos consultores aos
                produtores por meio da plataforma.
              </p>
              <p>
                2.6. Parceiros Comerciais: Empresas ou entidades que estabelecem
                acordos comerciais com a Coep Vale para oferecer benefícios aos
                usuários.
              </p>

              <p>
                <strong>3. Cadastro e Acesso</strong>
              </p>
              <p>
                3.1. Para utilizar a plataforma, o usuário deve fornecer
                informações verídicas e completas, mantendo seus dados sempre
                atualizados.
              </p>
              <p>
                3.2. A Coep Vale se reserva o direito de recusar ou suspender
                cadastros que violem estes Termos ou que apresentem informações
                falsas.
              </p>
              <p>
                3.3. O usuário é responsável pela segurança de suas credenciais
                de acesso e deve notificar a Coep Vale imediatamente em caso de
                uso não autorizado.
              </p>
              <p>
                3.4. O uso da plataforma por menores de idade só é permitido
                mediante autorização expressa dos responsáveis legais.
              </p>

              <p>
                <strong>4. Uso da Plataforma</strong>
              </p>
              <p>
                4.1. O usuário se compromete a utilizar a plataforma de forma
                ética, respeitando a legislação vigente e as boas práticas de
                mercado.
              </p>
              <p>
                4.2. É proibida a publicação de conteúdos ofensivos,
                fraudulentos, ilegais, discriminatórios ou que violem direitos
                de terceiros.
              </p>
              <p>
                4.3. A Coep Vale pode, a seu critério exclusivo, remover
                conteúdos e suspender contas que infrinjam estas diretrizes.
              </p>
              <p>
                4.4. O usuário deve respeitar as políticas internas da
                plataforma, incluindo diretrizes sobre comunicação e feedback
                entre produtores e consultores.
              </p>

              <p>
                <strong>5. Responsabilidades da Coep Vale</strong>
              </p>
              <p>
                5.1. A Coep Vale atua como intermediária entre produtores e
                consultores, não sendo responsável direta pelos serviços
                prestados.
              </p>
              <p>
                5.2. Nos esforçamos para manter a plataforma funcional, segura e
                livre de falhas, mas não garantimos operação ininterrupta ou
                isenta de erros técnicos.
              </p>
              <p>
                5.3. Nos reservamos o direito de realizar manutenções periódicas
                na plataforma, podendo suspender temporariamente alguns serviços
                para melhorias.
              </p>

              <p>
                <strong>6. Responsabilidades dos Usuários</strong>
              </p>
              <p>
                6.1. Os consultores são responsáveis pela qualidade e entrega
                dos serviços prestados, devendo agir com profissionalismo e
                ética.
              </p>
              <p>
                6.2. Os produtores devem fornecer informações claras sobre suas
                necessidades e cumprir com os pagamentos acordados, quando
                aplicável.
              </p>
              <p>
                6.3. Todos os usuários devem respeitar as regras da plataforma e
                manter um ambiente colaborativo e profissional.
              </p>
              <p>
                6.4. É proibido aos consultores firmarem contratos ou
                negociações diretas com produtores fora da plataforma, incluindo
                possíveis sanções.
              </p>

              <p>
                <strong>7. Privacidade e Proteção de Dados</strong>
              </p>
              <p>
                7.1. O uso da plataforma está sujeito à nossa Política de
                Privacidade, que regula a coleta, armazenamento e uso de dados
                pessoais.
              </p>
              <p>
                7.2. Os dados dos usuários não serão compartilhados com
                terceiros sem consentimento prévio, exceto em casos exigidos por
                lei.
              </p>
              <p>
                7.3. O usuário tem o direito de solicitar a exclusão de seus
                dados pessoais mediante solicitação formal à Coep Vale.
              </p>

              <p>
                <strong>8. Rescisão e Suspensão de Conta</strong>
              </p>
              <p>
                8.1. A Coep Vale pode suspender ou encerrar contas em caso de
                violação destes Termos ou uso indevido da plataforma.
              </p>
              <p>
                8.2. O usuário pode solicitar a exclusão de sua conta a qualquer
                momento, mediante pedido formal e observando as condições
                previstas na Política de Privacidade.
              </p>

              <p>
                <strong>9. Pagamentos e Taxas</strong>
              </p>
              <p>
                9.1. Alguns serviços na plataforma podem estar sujeitos a taxas
                ou cobranças, as quais serão informadas previamente ao usuário.
              </p>
              <p>
                9.2. A Coep Vale pode modificar as políticas de preços a
                qualquer momento, notificando os usuários sobre eventuais
                alterações.
              </p>
              <p>
                9.3. Pagamentos efetuados na plataforma são processados por meio
                de parceiros financeiros e estão sujeitos a suas respectivas
                políticas de uso.
              </p>

              <p>
                <strong>10. Alterações nos Termos</strong>
              </p>
              <p>
                10.1. A Coep Vale pode modificar estes Termos a qualquer
                momento. Em caso de alterações significativas, notificaremos os
                usuários com antecedência.
              </p>
              <p>
                10.2. O uso continuado da plataforma após qualquer alteração
                implica concordância com os novos Termos.
              </p>

              <p>
                <strong>11. Contato e Suporte</strong>
              </p>
              <p>
                Para dúvidas, suporte técnico ou sugestões, entre em contato
                conosco pelo canal de atendimento disponível na plataforma.
              </p>

              <p>
                <strong>12. Disposições Gerais</strong>
              </p>
              <p>
                12.1. A tolerância ao eventual descumprimento de quaisquer das
                cláusulas e condições destes Termos de Uso será considerada mera
                liberalidade e não constituirá novação das obrigações aqui
                estipuladas ou renúncia a qualquer direito, tampouco impedirá ou
                inibirá a exigibilidade das mesmas a qualquer tempo pela Coep
                Vale.
              </p>
              <p>
                12.2. Caso qualquer disposição destes Termos seja considerada
                ilegal, inválida ou inexequível, total ou parcialmente, essa
                disposição será, naquela medida, considerada como não existente
                para os efeitos destes Termos, mas a legalidade, validade e
                exequibilidade das demais disposições não serão afetadas.
              </p>
              <p>
                12.3. Nesse caso, as partes substituirão a disposição ilegal,
                inválida ou inexequível por outra que seja legal, válida e
                exequível e que tenha efeito similar para atingir a finalidade
                descrita nestes Termos.
              </p>
              <p>
                12.4. Para dirimir quaisquer dúvidas e controvérsias relativas
                ao conteúdo destes Termos, fica desde já estabelecida a
                aplicação das leis da República Federativa do Brasil,
                independentemente do país de onde forem acessadas as
                Plataformas.
              </p>
            </div>
            <h2 className="font-bold text-xl mt-6 mb-4">
              Política de Privacidade
            </h2>
            <div className="text-sm">
              <p>
                <strong>1. Introdução</strong>
              </p>
              <p>
                A Coep Vale valoriza a privacidade de seus usuários e está
                comprometida em proteger seus dados pessoais. Esta Política de
                Privacidade explica como coletamos, usamos, armazenamos e
                protegemos suas informações ao utilizar nossa plataforma
                digital.
              </p>
              <p>
                A plataforma Coep Vale é de exclusividade da empresa COEP VALE
                INOVA SIMPLES (I.S.), registrada sob o CNPJ 54.882.889/0001-07,
                com sede em Rua Reginaldo Alves Freitas, 90A, Cohab Massangano,
                Petrolina - PE, CEP 56310-808. Ao utilizar a plataforma, o
                usuário concorda com os termos desta Política de Privacidade.
              </p>
              <p>
                <strong>2. Coleta de Informações</strong>
              </p>
              <p>
                Coletamos as seguintes informações para garantir a melhor
                experiência aos usuários:
              </p>
              <ul className="list-disc ml-4">
                <li>
                  Informações fornecidas pelo usuário: Nome, e-mail, CPF/CNPJ,
                  telefone, endereço, dados bancários (para pagamentos), entre
                  outros necessários para cadastro e utilização da plataforma.
                </li>
                <li>
                  Dados de navegação: Endereço IP, tipo de navegador,
                  dispositivo utilizado, páginas visitadas e tempo de
                  permanência.
                </li>
                <li>
                  Cookies e tecnologias semelhantes: Utilizamos cookies para
                  personalizar a experiência do usuário e melhorar nossos
                  serviços.
                </li>
              </ul>
              <p>
                <strong>3. Uso das Informações</strong>
              </p>
              <p>As informações coletadas são utilizadas para:</p>
              <ul className="list-disc ml-4">
                <li>
                  Facilitar a intermediação entre produtores e consultores na
                  plataforma.
                </li>
                <li>
                  Processar pagamentos e garantir a segurança das transações.
                </li>
                <li>
                  Personalizar conteúdo e melhorar a experiência do usuário.
                </li>
                <li>
                  Enviar comunicações relacionadas à plataforma, incluindo
                  atualizações e ofertas.
                </li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
              <p>
                <strong>4. Armazenamento e Segurança dos Dados</strong>
              </p>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger os
                dados contra acessos não autorizados, uso indevido e perda.
              </p>
              <p>
                Os dados são armazenados em servidores seguros e criptografados.
                O acesso é restrito a funcionários autorizados que necessitam
                das informações para exercer suas funções.
              </p>
            </div>

            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded"
              onClick={closePopup}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default FormRegister;
