import {v1 as uuid} from 'uuid';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {fetchFilters} from "../heroesFilters/filtersSlice";
import {heroAdd} from '../heroesList/heroesSlice';
import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";

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
    const filters = useSelector(state => state.filters.filters);
    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);

    useEffect(() => {
      dispatch(fetchFilters());
    }, []);
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

    const renderFilters = (filters, status) => {
      if (status === 'loading') {
        return <option>loading...</option>
      } else {
        return [
          <option key={'default'}>Я владею элементом...</option>,
          ...filters.map(filter => {
            if (filter.name === 'Все') return;
            return <option key={filter.value} value={filter.value}>{filter.name}</option>
          })
        ]

      }
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
                  {renderFilters(filters, filtersLoadingStatus)}
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