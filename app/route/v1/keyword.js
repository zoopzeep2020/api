/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const KeywordController = require(APP_CONTROLLER_PATH + 'keyword');
let keywordController = new KeywordController();

router.get('/', keywordController.getAll);
router.get('/trendingkeyword', keywordController.getAllTrending);
router.get('/search', keywordController.getSearchResult);
router.get('/searchbyword', keywordController.getSearchResultByWord);
router.get('/:id', keywordController.get);
router.post('/', keywordController.create);
router.delete('/:id', keywordController.remove);
router.put('/:id', keywordController.update);

module.exports = router;