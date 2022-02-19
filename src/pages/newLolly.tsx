import React, { useState } from 'react';
import Layout from '../layout/Layout';
import Lolly from '../components/Lolly';
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const GET_LOLLIES = gql`
{
  allLollies{
    recName
    message
    senderName
    flavorTop
    flavorMiddle
    flavorBottom
    slug
  }
}
`

const CREATE_LOLLY = gql`
 mutation createLolly( 
      $recName: String!
      $message: String!
      $senderName: String!
      $flavorTop: String! 
      $flavorMiddle: String!
      $flavorBottom: String!
      $slug: String!
               ){
     createLolly(
          recName: $recName
          message: $message
          senderName: $senderName
          flavorTop: $flavorTop
          flavorMiddle: $flavorMiddle
          flavorBottom: $flavorBottom
          slug: $slug
         ){
            slug
    }
}`;


const newLolly = () => {
    const [clr1, setclr1] = useState('#fa43d2')
    const [clr2, setclr2] = useState("#fac219")
    const [clr3, setclr3] = useState("#fa73d9")
    const [createLolly] = useMutation(CREATE_LOLLY)
    const { loading, error, data } = useQuery(GET_LOLLIES)

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    if (error) {
        return (
            <div>something wrong</div>
        )
    }
    console.log(data);
    const onSubmit = async (values: any, actions: any) => {
        // const slug = shor.generate();
        // console.log(slug);
        const result = await createLolly({
            variables: {
                recName: values.to,
                message: values.message,
                senderName: values.from,
                flavorTop: clr1,
                flavorMiddle: clr2,
                flavorBottom: clr3,
                slug: "slug part",
            },
        });
        console.log(result);

        await actions.resetForm({
            values: {
                to: "",
                message: "",
                from: "",
            },
        });
    }
    return <Layout>
        {data && data.results && data.results.ref && (<h1>{data.results.ref.id}</h1>)}
        <div className='lolly--page'>
            <div className='lolly--lollypicker'>
                <Lolly fillLollyTop={clr1} fillLollyMiddle={clr2} fillLollyBottom={clr3} />
                <div className='lolly--clrpicker'>
                    <label htmlFor='color for fillLollyTop' className="colorPickerLabel">
                        <input type='color' value={clr1} onChange={e => setclr1(e.target.value)} name="flavourTop" className="colorPicker" id="flavourTop" />
                    </label>
                    <label htmlFor='color for fillLollyMiddle' className="colorPickerLabel">
                        <input type='color' value={clr2} onChange={e => setclr2(e.target.value)} className="colorPicker" name="flavourTop" id="flavourTop" />
                    </label>
                    <label htmlFor='color for fillLollyBottom' className="colorPickerLabel">
                        <input type='color' value={clr3} onChange={e => setclr3(e.target.value)} className="colorPicker" name="flavourTop" id="flavourTop" /></label>
                </div>
            </div>
            <div>
                <Formik
                    initialValues={{ to: '', message: '', from: '' }}
                    validationSchema={Yup.object({
                        to: Yup.string()
                            .min(3, 'Must be 3 characters or bigger')
                            .required('Sender Name is Required'),
                        message: Yup.string()
                            .min(10, 'Must be 10 characters or bigger')
                            .required('Required'),
                        from: Yup.string().required('Name is Required'),
                    })}
                    onSubmit={onSubmit}
                >
                    <Form
                        className='lolly--form'>
                        <label htmlFor="to" className="nameLabled">To</label>
                        <Field name="to" className="nameFields" type="text" />
                        <ErrorMessage name="to" />
                        <label htmlFor="message" className="nameLabled">Message</label>
                        <Field name="message" className="nameFields" as="textarea" rows="15" columns="30" />
                        <ErrorMessage name="message" />

                        <label htmlFor="from" className="nameLabled">From</label>
                        <Field name="from" className="nameFields" type="text" />
                        <ErrorMessage name="from" />

                        <button type="submit" className="btn--lolly">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    </Layout >;
};

export default newLolly;
