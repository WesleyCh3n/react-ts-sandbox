import { useState, useRef } from 'react';
import {
  Container, Row, Col, Nav, Navbar,
  NavDropdown, Card, Button, Tab, Tabs, ProgressBar
} from 'react-bootstrap';

const App = () => {
  return (
    <div>
      <MyNav />
      <MyTab />
    </div>
  );
}

const MyNav = () => {
  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Status</Nav.Link>
            <NavDropdown title="Tutorial" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Login</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const MyTab = () => {
  return(
    <Container>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="CD Helper">
          <HomeTab />
        </Tab>
        <Tab eventKey="iso" title="ISO Compressor">
          Another content
        </Tab>
        <Tab eventKey="history" title="History">
          The other content
        </Tab>
      </Tabs>
    </Container>
  );
}

const HomeTab = () => {
  return(
    <div>
      <CDHelper />
    </div>
  )
}

const CDHelper = () => {
  interface BtnState {
    disabled: boolean;
    msg: string;
  }
  const [progress, setProgress] = useState(0);
  const [btn, setBtn] = useState<BtnState>({disabled: false, msg: "Start"});
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<null | HTMLDivElement>(null);

  /* emulate itense job */
  async function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

  const doSomeTask = async () => {
    setProgress(0)
    setBtn({disabled: true, msg: "Working"})

    var tasks = [1,2,3,4,5,6,7,1,1,1,1,1,1,1,1]
    for (let i = 0, len = tasks.length; i < len; i++) {
      // do some subprocess task
      await sleep(1000)
      setLogs(logs => logs = [...logs, `${i} task complete`])
      logEndRef.current!.scrollIntoView({ behavior: 'smooth' })
      setProgress((100/tasks.length)*(i+1))
    }

    setBtn({disabled: true, msg: "Finished"})
    await sleep(1000)

    setProgress(0)
    setBtn({disabled: false, msg: "Start"})
  }

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <Container fluid>
      <Row>
        <Col className="col-md-8">
          <Card className="text-left">
            <Card.Body>
              <Card.Title>CD Helper</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Pulling .ini driver</Card.Subtitle>
              <Card.Text>
                Some instruction to work with the helper
                <ProgressBar now={progress} label={`${progress.toFixed(2)}%`} />
              </Card.Text>
              <Button variant="outline-primary"
                onClick={doSomeTask}
                disabled={btn.disabled}>
                {btn.msg}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-md-4">
          <Card className="text-left">
            <Card.Body>
              <Card.Title>CD Helper Log</Card.Title>
              <Card.Text
                style={{
                  maxHeight: '12rem',
                  overflowY: 'auto',
                }}>
                {logs.map(e => (<Container>{e}</Container>))}
                <div ref={logEndRef} />
              </Card.Text>
              <Card.Text>
              </Card.Text>
              <Button variant="outline-primary"
                onClick={clearLogs}>
                Clear Log
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
