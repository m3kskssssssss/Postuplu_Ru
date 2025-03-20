const Contacts = () => {
  return (
    <main className="section">
      <div className="container">

        <div className="contacts-wrapper">
          <div className="contacts-info">
            <ul className="content-list">
              <li className="content-list__item">
                <h2 className="title-4">Местоположение</h2>
                <p>Физико-технологический институт УрФУ</p>
              </li>
              <li className="content-list__item">
                <h2 className="title-4">Телефон для обратной связи</h2>
                <p>
                  <a href="tel:+73432538844">+7 (901) 220-50-40</a>
                </p>
              </li>
              <li className="content-list__item">
                <h2 className="title-4">Вопросы по работе сайта</h2>
                <p>
                  <a href="mailto:misha_2003_5@mail.ru">misha_2003_5@mail.ru</a>
                </p>
              </li>
              <li className="content-list__item">
                <h2 className="title-4">Автор работы</h2>

                <p>Стрельников Михаил Алексеевич Фт-320008</p>
              </li>
            </ul>
          </div>
          <div className="contacts-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2182.249664522229!2d60.650094976855065!3d56.84166127350674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c16c2f7a3e60bd%3A0x7063985e5d50dbda!2z0YPQuy4g0JzQuNGA0LAsIDIxLCDQldC60LDRgtC10YDQuNC90LHRg9GA0LMsINCh0LLQtdGA0LTQu9C-0LLRgdC60LDRjyDQvtCx0LsuLCA2MjAwNzg!5e0!3m2!1sru!2sru!4v1734581979731!5m2!1sru!2sru" width="600" height="500" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contacts;