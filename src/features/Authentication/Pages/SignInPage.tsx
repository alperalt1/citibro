import { AuthenticationService } from '../services/AuthenticationServices';
import logo from '../../../assets/images/logos/Citibrokers_sinfondo.png';
import { Button, Checkbox, Form, Input, Layout, Spin } from 'antd';
import logoImg from '../../../assets/images/logos/logoend.png';
import { LoginInputModel } from '../Models/LoginModels';
import { LoadingOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import '../../../App.css';

const SignInPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { iniciarSesion, isLoadingLogin } = AuthenticationService();
  const onFinish = (values: LoginInputModel) => {
    //iniciarSesion(values)
    console.log(values)
  };
  return (
    <>
      <Toaster position="top-center" />
      <Layout className='ContenedorSignInPage'>
        <Content className='ContenedorSignInPage_Imagen'>
          <img style={{ width: "60%", marginBottom: 80 }} src={logoImg}></img>
        </Content>
        <Content className='ContenedorSignInPage_Form'>
          <img style={{ width: "62%" }} src={logo}></img>
          <Form
            style={{ width: '60%' }}
            form={form}
            size='large'
            layout='vertical'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="on"
          >
            <Form.Item<LoginInputModel>
              layout='vertical'
              label="Usuario"
              name="usuario"
            >
              <Input />
            </Form.Item>
            <Form.Item<LoginInputModel>
              layout='vertical'
              label="Contraseña"
              name="clave"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<LoginInputModel> name="recordarSesion" valuePropName="checked" label={null}>
              <Checkbox>Recordarme</Checkbox>
            </Form.Item>
            <Form.Item label={null}>
              <Button onClick={()=>{
                navigate('/dashboard');
              }} type="primary" style={{ backgroundColor: "#16277f" }} htmlType="submit">
                {
                  isLoadingLogin ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : 'Iniciar Sesión'
                }
              </Button>
            </Form.Item>
          </Form>

        </Content>

      </Layout>
    </>
  );
};

export default SignInPage;
