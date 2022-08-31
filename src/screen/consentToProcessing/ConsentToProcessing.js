import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../components/headers/SimpleHeader';
import Checkbox from '../../components/UI/checkbox/Checkbox';
import MainButton from '../../components/UI/buttons/MainButton';

const ConsentToProcessing = () => {
  return (
    <View>
      <LinearGradient colors={['black', 'black']}>
        <SimpleHeader title={'Согласие на обработку   '} />
        <Text style={styles.title}>
          Согласие на обработку персональных данных физических лиц
        </Text>
        <Text style={[styles.information, {marginTop: 20}]}>
          Версия: 1.0, Дата публикации 1.06.2022 Физическое лицо (Пользователь),
          используя мобильное приложение «Taptable» или интернет-сайт по адресу
          http://tap-table.ru/ (совместно именуемые Сервис) и направляя
          запрос на обратную связь, дает ООО «ТАПТЭЙБЛ» (Администрация) свое
          согласие на обработку персональных данных (далее - Согласие) на
          изложенных ниже условиях:
        </Text>
        <Text style={[styles.header, {marginTop: 20}]}>
          1. Правовыми основаниями для обработки персональных данных являются:
        </Text>
        <Text style={styles.information}>
          • ст. 24 Конституции Российской Федерации; • Федеральный закон №152-ФЗ
          «О персональных данных»; • Политика в отношении обработки и защиты
          персональных данных (http://tap-table.ru/privacy)
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          2. Давая согласие, Пользователь подтверждает, что:
        </Text>
        <Text style={styles.information}>
          • действует свободно, по своей воле и в своем интересе; • является
          дееспособным; • согласие является конкретным, информированным и
          сознательным.
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          3. Администрация осуществляет связанные с обработкой персональных
          данных процессы в целях выполнения обязательств в соответствии с
          соглашением об использовании Сервиса
          (http://tap-table.ru/useragreement). Такими обязательствами
          Администрации являются:
        </Text>
        <Text style={styles.information}>
          • регистрация и идентификация Пользователя в Сервисе; • предоставление
          Пользователю доступа к личному кабинету и возможности редактировать
          личные данные; • связь с Пользователем, в том числе направление
          уведомлений, запросов и информации, касающихся использования Сервиса,
          оказания услуг, исполнения соглашения об использовании Сервиса; •
          улучшение качества работы Сервиса, удобства его использования,
          разработка новых услуг; • проведение статистических и иных
          исследований, на основе обезличенных данных; • обработка входящих
          запросов и заявок от Пользователя с целью консультирования по вопросам
          работы Сервиса; • аналитика действий физического лица в Сервисе и
          функционирования Сервиса; • проведение рекламных и новостных рассылок;
          • предотвращения случаев мошенничества и других злоупотреблений, а
          также для расследования таких случаев; • разрешение споров; •
          исполнение требований законодательства РФ.
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          4. Перечень персональных данных, на обработку которых дается Согласие:
        </Text>
        <Text style={styles.information}>
          • данные о технических средствах (устройствах): IP-адрес, вид
          операционной системы, тип браузера, географическое положение,
          поставщик услуг сети Интернет. • сведения о поведении Пользователя в
          Сервисе (в том числе дата, время и количество посещений, сведения о
          посещенных страницах, о переходе с других ресурсов, о направленных
          заявках). • информация, автоматически получаемая при доступе к
          Сервису, в том числе с использованием файлов cookies. Файлы cookies
          представляют собой фрагменты текста, который автоматически сохраняется
          в память интернет-браузера Пользователя. Это позволяет Сервису в
          необходимых случаях обращаться к сохраненной информации на компьютере
          Пользователя и извлекать ее. Вы вправе изменить настройки своего
          интернет-браузера и отказаться от сохранения файлов cookies. • общие
          персональные данные: имя, электронный адрес, номер телефона.
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          5. Перечень действий с персональными данными: сбор, запись,
          систематизация, накопление, хранение, уточнение (обновление,
          изменение), электронное копирование, извлечение, использование,
          передача (распространение, предоставление, доступ), обезличивание,
          блокирование, удаление и уничтожение.
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          6. Обработка персональных данных осуществляется как с использованием
          средств автоматизации, так и без использования таких средств.
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          7. Согласие считается данным на предоставление персональных данных
          третьим лицам в необходимом объеме в случае их привлечения для
          достижения целей обработки и исполнения соглашения об использовании
          Сервиса.
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          8. Срок, в течение которого действует Согласие: до прекращения работы
          Сервиса или отзыва Согласия.
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          9. Пользователь вправе отозвать Согласие путем направления
          Администрации заявления:
        </Text>
        <Text style={styles.information}>
          • в письменной форме по адресу: 350000, Краснодарский край, г.
          Краснодар, ул. Красная 1, оф.17 • в форме электронного документа по
          адресу электронной почты: tap-table@yandex.ru. Заявление должно
          содержать следующую информацию: • сведения о документе, удостоверяющем
          личность Пользователя; • сведения, подтверждающие участие Пользователя
          в отношениях с Администрацией; • данные представителя и подтверждение
          его полномочий (при обращении представителя); • подпись Пользователя
          (представителя).
        </Text>
        <Text style={[styles.header, {marginTop: 5}]}>
          10. Контактная информация и реквизиты Администрации:
        </Text>
        <Text style={[styles.information, {marginBottom: 50}]}>
          ООО «ТАПТЭЙБЛ» Юридический адрес: 350000, Краснодарский край, г.
          Краснодар, ул. Красная 1, оф.17 Фактический адрес: 350000,
          Краснодарский край, г. Краснодар, ул. Красная 1, оф.17 ОГРН
          99999999999 ИНН 99999999 КПП 99999999 Адрес электронной почты:
          tap-table@yandex.ru.
        </Text>
        <Checkbox text={'Я согласен(а)'} />
        <View style={{marginTop: 30, marginHorizontal: 30, marginBottom: 80}}>
          <MainButton textBtn={'Подтвердить'} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    marginLeft: 10,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    marginHorizontal: 32,
    marginTop: 20,
    fontWeight: 'bold',
  },
  header: {
    fontWeight: 'bold',
    color: '#5F6368',
    fontSize: 16,
    marginLeft: 32,
  },
  information: {
    color: '#5F6368',
    fontSize: 16,
    marginLeft: 32,
  },
});

export default ConsentToProcessing;
