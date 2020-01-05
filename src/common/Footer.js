import React from 'react';

class Footer extends React.Component {

    render() {

        return (

            <div id='footer' className="row bg-secondary text-white text-center" >
                <div className='row'>
                    <div className='col-6'>
                        <h6>About</h6>
                        <p class="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
                    </div>
                    <div className='col-6'>
                        <h6>Categories</h6>
                        <ul class="footer-links">
                            <li><a href="http://scanfcode.com/category/c-language/">Link 1</a></li>
                            <li><a href="http://scanfcode.com/category/c-language/">Link 2</a></li>
                            <li><a href="http://scanfcode.com/category/c-language/">Link 3</a></li>

                        </ul>

                    </div>

                </div>
            </div>
        );
    }
}

export default Footer;