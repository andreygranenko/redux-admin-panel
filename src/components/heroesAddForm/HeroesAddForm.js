import {v1 as uuid} from 'uuid';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {heroAdd} from "../../actions";
import {useHttp} from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const addHero = (values) => {
      const id = uuid();
      request('http://localhost:3001/heroes', 'POST',
        JSON.stringify({
          id: id,
          name: values.name,
          description: values.text,
          element: values.element
        }),
        {
          'Content-Type': 'application/json'
        }
      )
        .then(() => {
          dispatch(heroAdd({
            id: id,
            name: values.name,
            description: values.text,
            element: values.element
          }))
        })
        .catch(e => console.log(e));

    }
    return (
        <Formik
          initialValues={
          {
            name: "",
            text: "",
            element: ""
          }
        }
          onSubmit={(values) => addHero(values)
            }
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, 'Minimum symbol amount is 2')
              .required('Required!'),
            text: Yup.string()
              .min(10, 'Minimum symbol amount is 10')
              .required('Required!'),
            element: Yup.string()
              .required('Required!')

          })}>
          <Form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
              <Field
                // type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Как меня зовут?"/>
              <ErrorMessage className={'error'} name={'name'} component={'div'}/>
            </div>

            <div className="mb-3">
              <label htmlFor="text" className="form-label fs-4">Описание</label>
              <Field
                name="text"
                className="form-control"
                id="text"
                as={'textarea'}
                placeholder="Что я умею?"
                style={{"height": '130px'}}/>
              <ErrorMessage className={'error'} name={'text'} component={'div'}/>
            </div>

            <div className="mb-3">
              <label htmlFor="element" className="form-label">Выбрать элемент героя
                <Field
                  as={'select'}
                  className="form-select"
                  id="element"
                  name="element">
                  <option >Я владею элементом...</option>
                  <option value="fire">Огонь</option>
                  <option value="water">Вода</option>
                  <option value="wind">Ветер</option>
                  <option value="earth">Земля</option>
                </Field>
              </label>
              <ErrorMessage className={'error'} name={'element'} component={'div'}/>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
          </Form>
        </Formik>
    )
}

export default HeroesAddForm;